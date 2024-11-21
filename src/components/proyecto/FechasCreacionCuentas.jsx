/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const FechasCreacionCuentas = ({ users }) => {
  const data = users.reduce((acc, user) => {
    const year = new Date(user.created).getFullYear();
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(data).sort((a, b) => a.year - b.year);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Cuentas Creadas por Año</h2>
      <div className='h-[320px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='year' stroke='#9CA3AF' label={{ value: 'Año', position: 'insideBottomCenter', offset: -5, fill: '#9CA3AF' }} />
            <YAxis stroke='#9CA3AF' label={{ value: '# Cuentas', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value}`}
              labelFormatter={(label) => `Año: ${label}`}
            />
            <Legend />
            <Bar
              dataKey='count'
              name='Cuentas'
              fill='#8B5CF6'
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FechasCreacionCuentas;