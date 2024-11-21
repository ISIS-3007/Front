/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const ConteoDepartamentos = ({ users }) => {
  const departamentoCounts = users.reduce((acc, user) => {
    const departamento = user.location.split(',').pop().trim();
    acc[departamento] = (acc[departamento] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(departamentoCounts).map((departamento, index) => ({
    departamento,
    count: departamentoCounts[departamento],
    key: `${departamento}-${index}` // Asegurarse de que las claves sean únicas
  }));

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Cuentas por Departamento</h2>
      <div className='h-[320px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='departamento' stroke='#9CA3AF' tick={{ angle: -90, textAnchor: 'end' }} interval={0} label={{ value: 'Departamento', position: 'insideBottomCenter', offset: -5, fill: '#9CA3AF' }} />
            <YAxis stroke='#9CA3AF' label={{ value: '# Cuentas', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value}`}
              labelFormatter={(label) => `Departamento: ${label}`}
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

export default ConteoDepartamentos;