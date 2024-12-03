/* eslint-disable react/prop-types */
import { useState } from "react";
import SettingSection from "./SettingSection";
import { Search } from "lucide-react";

const ScraperQuery = () => {
  const [formData, setFormData] = useState({
    query: "",
    limit: 10,
  });
  const [formErrors, setFormErrors] = useState({
    query: false,
    limit: false,
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "limit" ? parseInt(value, 10) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = formData.query && formData.limit;

    if (!isFormValid) {
      setFormErrors({
        query: !formData.query,
        limit: !formData.limit,
      });
      setShowErrorMessage(true);
      return;
    }

    const dataToSend = {
      query: formData.query,
      limit: formData.limit,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/scraper/scrape/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Query sent successfully!");
        setFormData({
          query: "",
          limit: 10,
        });
        setShowErrorMessage(false);
      } else {
        alert("Failed to send query.");
      }
    } catch (error) {
      console.error("Error sending query:", error);
      alert("An error occurred while sending the query.");
    }
  };

  return (
    <SettingSection icon={Search} title={"Scraper Query"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="query">
            Query
          </label>
          <input
            type="text"
            id="query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.query ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="limit">
            Limit
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded ${formErrors.limit ? "bg-red-700 text-red-300" : "bg-gray-700 text-gray-300"}`}
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
          Send Query
        </button>
      </form>
    </SettingSection>
  );
};

export default ScraperQuery;