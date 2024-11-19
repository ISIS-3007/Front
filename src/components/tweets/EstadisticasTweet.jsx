/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#8B5CF6", "#34D399", "#F59E0B", "#10B981", "#F59E0B"]; 

const EstadisticasTweet = ({ tweets }) => {
  const TWEET_STATS_DATA = tweets.map(tweet => ({
    name: tweet.raw_content,
    likes: tweet.like_count,
    retweets: tweet.retweet_count,
    replies: tweet.reply_count,
  }));

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>Estadisiticas del tweet</h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <BarChart data={TWEET_STATS_DATA}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey='name' stroke='#9CA3AF' />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="likes" fill={COLORS[0]} />
            <Bar dataKey="retweets" fill={COLORS[1]} />
            <Bar dataKey="replies" fill={COLORS[2]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EstadisticasTweet;