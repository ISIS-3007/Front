/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { Cpu } from "lucide-react";

const ScraperIA = () => {
  const [activeIA, setActiveIA] = useState("");
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    const fetchActiveIA = async () => {
      try {
        const response = await fetch("http://167.114.144.233:8000/api/strategies/");
        if (response.ok) {
          const data = await response.json();
          setStrategies(data);
          const activeStrategy = data.find(strategy => strategy.is_active);
          if (activeStrategy) {
            setActiveIA(activeStrategy.name === "openai" ? "ChatGPT" : activeStrategy.name.charAt(0).toUpperCase() + activeStrategy.name.slice(1));
          }
        } else {
          console.error("Failed to fetch active IA.");
        }
      } catch (error) {
        console.error("Error fetching active IA:", error);
      }
    };

    fetchActiveIA();
  }, []);

  const handleToggle = (ia) => {
    setActiveIA(activeIA === ia ? "" : ia);
  };

  const handleSubmit = async () => {
    const strategyMap = strategies.reduce((map, strategy) => {
      map[strategy.name.charAt(0).toUpperCase() + strategy.name.slice(1)] = strategy.name;
      return map;
    }, {});

    const dataToSend = {
      strategy: strategyMap[activeIA],
    };

    try {
      const response = await fetch("http://167.114.144.233:8000/api/strategies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Configuration saved successfully!");
      } else {
        alert("Failed to save configuration.");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("An error occurred while saving the configuration.");
    }
  };

  return (
    <SettingSection icon={Cpu} title={"Scraper IA"}>
      <ToggleSwitch
        label={"ChatGPT"}
        isOn={activeIA === "ChatGPT"}
        onToggle={() => handleToggle("ChatGPT")}
      />
      <ToggleSwitch
        label={"Claude"}
        isOn={activeIA === "Claude"}
        onToggle={() => handleToggle("Claude")}
      />
      <ToggleSwitch
        label={"Gemini"}
        isOn={activeIA === "Gemini"}
        onToggle={() => handleToggle("Gemini")}
      />
      <div className='mt-4'>
        <button
          onClick={handleSubmit}
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200'
        >
          Save Configuration
        </button>
      </div>
    </SettingSection>
  );
};

export default ScraperIA;