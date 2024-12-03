/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const TweetsPorFecha = ({ tweets, onDateSelect }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const years = [...new Set(tweets.map(tweet => new Date(tweet.date).getFullYear()))];
  const months = [...new Set(tweets.filter(tweet => new Date(tweet.date).getFullYear() === selectedYear).map(tweet => new Date(tweet.date).getMonth() + 1))];

  const filteredTweets = tweets.filter(tweet => {
    const tweetDate = new Date(tweet.date);
    return tweetDate.getFullYear() === selectedYear && (tweetDate.getMonth() + 1) === selectedMonth;
  });

  const data = filteredTweets.reduce((acc, tweet) => {
    const fullDate = new Date(tweet.date).toLocaleDateString();
    const day = new Date(tweet.date).getDate(); // Only get the day
    if (!acc[day]) {
      acc[day] = { day, fullDate, count: 0 };
    }
    acc[day].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(data).sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth(1); // Reset month to January when year changes
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    // Ensure the selected month is valid for the selected year
    if (!months.includes(selectedMonth)) {
      setSelectedMonth(months[0] || currentMonth);
    }
  }, [selectedYear, months, currentMonth]);

  const handleBarClick = (data) => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1, data.day);
    onDateSelect(selectedDate);
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-100'>Tweets por Día</h2>
        <div className='flex items-center'>
          <label className='text-gray-100 mr-2'>Año:</label>
          <select value={selectedYear} onChange={handleYearChange} className='bg-gray-700 text-gray-100 p-2 rounded mr-4'>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <label className='text-gray-100 mr-2'>Mes:</label>
          <select value={selectedMonth} onChange={handleMonthChange} className='bg-gray-700 text-gray-100 p-2 rounded'>
            {months.map(month => (
              <option key={month} value={month}>{["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][month - 1]}</option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} onClick={(data) => handleBarClick(data.activePayload[0].payload)}>
          <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
          <XAxis dataKey="day" stroke='#9CA3AF' label={{ value: 'Día', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }} />
          <YAxis stroke='#9CA3AF' label={{ value: '# Tweets', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#E5E7EB' }}
            labelFormatter={(label) => {
              const item = chartData.find(d => d.day === label);
              return item ? item.fullDate : '';
            }} 
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TweetsPorFecha;