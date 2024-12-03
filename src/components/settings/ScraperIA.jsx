/* eslint-disable react/prop-types */
import { useState } from "react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { Cpu } from "lucide-react";

const ScraperIA = () => {
  const [activeIA, setActiveIA] = useState("");

  const handleToggle = (ia) => {
    setActiveIA(activeIA === ia ? "" : ia);
  };

  const handleSubmit = async () => {
    const strategies = [
      { name: "openai", is_active: activeIA === "ChatGPT" },
      { name: "claude", is_active: activeIA === "Claude" },
      { name: "gemini", is_active: activeIA === "Gemini" },
    ];

    try {
      const response = await fetch("http://127.0.0.1:8000/api/strategies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strategies),
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