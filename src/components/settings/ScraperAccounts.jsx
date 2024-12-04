/* eslint-disable react/prop-types */
import { useState } from "react";
import SettingSection from "./SettingSection";
import { Database } from "lucide-react";

const ScraperAccounts = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    auth_token: "",
    ct0: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: false,
    password: false,
    auth_token: false,
    ct0: false,
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = formData.username && formData.password && formData.auth_token && formData.ct0;

    if (!isFormValid) {
      setFormErrors({
        username: !formData.username,
        password: !formData.password,
        auth_token: !formData.auth_token,
        ct0: !formData.ct0,
      });
      setShowErrorMessage(true);
      return;
    }

    const dataToSend = {
      username: formData.username,
      password: formData.password,
      cookies: {
        auth_token: formData.auth_token,
        ct0: formData.ct0,
      },
      is_active: true,
      logged_in: true,
    };

    try {
      const response = await fetch("http://167.114.144.233:8000/scraper/accounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Account saved successfully!");
        setFormData({
          username: "",
          password: "",
          auth_token: "",
          ct0: "",
        });
        setShowErrorMessage(false);
      } else {
        alert("Failed to save account.");
      }
    } catch (error) {
      console.error("Error saving account:", error);
      alert("An error occurred while saving the account.");
    }
  };

  return (
    <SettingSection icon={Database} title={"Scraper Accounts"}>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="auth_token">
            Auth Token
          </label>
          <input
            type="text"
            id="auth_token"
            name="auth_token"
            value={formData.auth_token}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.auth_token ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="ct0">
            CT0
          </label>
          <input
            type="text"
            id="ct0"
            name="ct0"
            value={formData.ct0}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.ct0 ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
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
          Save Account
        </button>
      </form>
    </SettingSection>
  );
};

export default ScraperAccounts;