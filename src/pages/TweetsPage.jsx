import { useState, useContext, useEffect } from 'react';

import Header from "../components/common/Header";

import SegmentacionEmociones from "../components/tweets/SegmentacionEmociones";
import TablaTweets from "../components/tweets/TablaTweets";
import TweetsPorFecha from "../components/tweets/TweetsPorFecha";
import NubeHastags from "../components/tweets/NubeHastags";
import { DataContext } from '../DataContext';
import TablaUsuarios from '../components/tweets/TablaUsuarios';
import PolarityBarChart from '../components/tweets/PolarityBarChart';

const TweetsPage = () => {
  const { tweets, users, loading } = useContext(DataContext);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Mapear los datos de los tweets para asegurarse de que view_count no sea null
  const mappedTweets = tweets.map(tweet => ({
    ...tweet,
    view_count: tweet.view_count ?? 0,
    user_id: tweet.user_id ?? tweet.user, // Ensure user_id is set
  }));

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Tweets' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <TweetsPorFecha tweets={mappedTweets} />
          <SegmentacionEmociones tweets={mappedTweets} />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <div className='space-y-6'>
            <TablaTweets tweets={mappedTweets} users={users} setFilteredUsers={setFilteredUsers} />
          </div>
          <div className='space-y-6'>
            <TablaUsuarios users={filteredUsers} />
          </div>
        </div>
        <div className='lg:col-span-4 mt-6'>
          <div className='w-full h-full'>
            <NubeHastags tweets={mappedTweets} />
            <PolarityBarChart tweets={mappedTweets} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TweetsPage;