/* eslint-disable react/prop-types */
import { useState } from "react";
import SettingSection from "./SettingSection";
import { Globe } from "lucide-react";

const ScraperProxies = () => {
  const [formData, setFormData] = useState({
    ip: "",
    port: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    ip: false,
    port: false,
    username: false,
    password: false,
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "port" ? parseInt(value, 10) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = formData.ip && formData.port && formData.username && formData.password;

    if (!isFormValid) {
      setFormErrors({
        ip: !formData.ip,
        port: !formData.port,
        username: !formData.username,
        password: !formData.password,
      });
      setShowErrorMessage(true);
      return;
    }

    const dataToSend = {
      ip: formData.ip,
      port: formData.port,
      username: formData.username,
      password: formData.password,
      is_active: true,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/scraper/proxies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Proxy saved successfully!");
        setFormData({
          ip: "",
          port: "",
          username: "",
          password: "",
        });
        setShowErrorMessage(false);
      } else {
        alert("Failed to save proxy.");
      }
    } catch (error) {
      console.error("Error saving proxy:", error);
      alert("An error occurred while saving the proxy.");
    }
  };

  return (
    <SettingSection icon={Globe} title={"Scraper Proxies"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="ip">
            IP
          </label>
          <input
            type="text"
            id="ip"
            name="ip"
            value={formData.ip}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.ip ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="port">
            Port
          </label>
          <input
            type="number"
            id="port"
            name="port"
            value={formData.port}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.port ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.username ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.password ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        {showErrorMessage && (
          <div className="text-red-500 mb-4">
            Todos los campos deben estar llenos.
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Save Proxy
        </button>
      </form>
    </SettingSection>
  );
};

export default ScraperProxies;