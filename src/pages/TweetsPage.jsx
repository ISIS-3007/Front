import { useState, useContext, useEffect } from 'react';
import { motion } from "framer-motion";
import { Smile, TrendingUp, Angry, Meh } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SegmentacionEmociones from "../components/tweets/SegmentacionEmociones";
import TablaTweets from "../components/tweets/TablaTweets";
import TweetsPorFecha from "../components/tweets/TweetsPorFecha";
import NubeHastags from "../components/tweets/NubeHastags";
import TablaUsuarios from "../components/tweets/TablaUsuarios";
import { DataContext } from '../DataContext';

const TweetsPage = () => {
  const { tweets, users, loading } = useContext(DataContext);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calcular los valores de los posts
  const totalPosts = tweets.length;
  const positivePosts = tweets.filter(tweet => tweet.polarity === 'positive').length;
  const negativePosts = tweets.filter(tweet => tweet.polarity === 'negative').length;
  const neutralPosts = tweets.filter(tweet => tweet.polarity === 'neutral').length;

  // Mapear los datos de los tweets para asegurarse de que view_count no sea null
  const mappedTweets = tweets.map(tweet => ({
    ...tweet,
    view_count: tweet.view_count ?? 0,
    user_id: tweet.user_id ?? tweet.user, // Ensure user_id is set
  }));

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(null);
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Tweets' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='Post totales' icon={TrendingUp} value={totalPosts} color='#22C55E' />
          <StatCard name='Post positivos' icon={Smile} value={positivePosts} color='#22C55E' />
          <StatCard name='Post negativos' icon={Angry} value={negativePosts} color='#EF4444' />
          <StatCard name='Post neutrales' icon={Meh} value={neutralPosts} color='#3B82F6' />
        </motion.div>

        <TweetsPorFecha tweets={mappedTweets} onDateSelect={handleDateSelect} />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <div className='space-y-6'>
            <TablaTweets tweets={mappedTweets} users={users} setFilteredUsers={setFilteredUsers} selectedDate={selectedDate} resetDate={resetDate} />
          </div>
          <div className='space-y-6'>
            <TablaUsuarios users={filteredUsers} />
            <SegmentacionEmociones tweets={mappedTweets} />
          </div>
        </div>
        <div className='lg:col-span-4 mt-6'>
          <div className='w-full h-full'>
            <NubeHastags tweets={mappedTweets} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TweetsPage;