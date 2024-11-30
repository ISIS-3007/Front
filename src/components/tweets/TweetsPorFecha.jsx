/* eslint-disable react/prop-types */
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const TweetsPorFecha = ({ tweets }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e) => setSelectedYear(parseInt(e.target.value));
  const handleMonthChange = (e) => setSelectedMonth(parseInt(e.target.value));

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
          <label className='text-gray-100 mr-2'>Mes:</label>
          <select value={selectedMonth} onChange={handleMonthChange} className='bg-gray-700 text-gray-100 p-2 rounded mr-4'>
            {months.map(month => (
              <option key={month} value={month}>{["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][month - 1]}</option>
            ))}
          </select>
          <label className='text-gray-100 mr-2'>Año:</label>
          <select value={selectedYear} onChange={handleYearChange} className='bg-gray-700 text-gray-100 p-2 rounded'>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='h-[320px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='day' stroke='#9CA3AF' tick={{ angle: 0, textAnchor: 'end' }} interval={0} label={{ value: 'Día', position: 'insideBottom', offset: -5, fill:'#9CA3AF' }} />
            <YAxis stroke='#9CA3AF' label={{ value: '# Tweets', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value}`}
              labelFormatter={(label) => `Fecha: ${chartData.find(item => item.day === label).fullDate}`}
            />
            {/* <Legend verticalAlign="top" height={36} /> */}
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

export default TweetsPorFecha;