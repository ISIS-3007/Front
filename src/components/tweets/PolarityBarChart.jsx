/* eslint-disable react/prop-types */
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const PolarityBarChart = ({ tweets }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e) => setSelectedYear(parseInt(e.target.value));
  const handleMonthChange = (e) => setSelectedMonth(parseInt(e.target.value));

  const filteredTweets = tweets.filter(tweet => {
    const tweetDate = new Date(tweet.date);
    return tweetDate.getFullYear() === selectedYear && (tweetDate.getMonth() + 1) === selectedMonth;
  });

  const data = filteredTweets.reduce((acc, tweet) => {
    const polarity = tweet.polarity;
    if (!acc[polarity]) {
      acc[polarity] = { polarity, count: 0 };
    }
    acc[polarity].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(data);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-100'>Tweets por Polaridad</h2>
        <div className='flex items-center'>
          <label className='text-gray-100 mr-2'>Mes:</label>
          <select value={selectedMonth} onChange={handleMonthChange} className='bg-gray-700 text-gray-100 p-2 rounded mr-4'>
            {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
          <label className='text-gray-100 mr-2'>Año:</label>
          <select value={selectedYear} onChange={handleYearChange} className='bg-gray-700 text-gray-100 p-2 rounded'>
            {[2022, 2023, 2024].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='h-[320px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='polarity' stroke='#9CA3AF' tick={{ angle: 0, textAnchor: 'end' }} interval={0} label={{ value: 'Polaridad', position: 'insideBottomCenter', offset: 50, fill: '#9CA3AF' }} />
            <YAxis stroke='#9CA3AF' label={{ value: '# Tweets', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value}`}
              labelFormatter={(label) => `Polaridad: ${label}`}
            />
            <Bar
              dataKey='count'
              name='Tweets'
              fill='#8B5CF6'
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PolarityBarChart;