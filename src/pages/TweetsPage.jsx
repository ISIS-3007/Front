import { useContext } from 'react';

import Header from "../components/common/Header";

import SegmentacionEmociones from "../components/tweets/SegmentacionEmociones";
import TablaTweets from "../components/tweets/TablaTweets";
import TweetsPorFecha from "../components/tweets/TweetsPorFecha";
import NubeHastags from "../components/tweets/NubeHastags";
import { DataContext } from '../DataContext';

const TweetsPage = () => {
  const { tweets, users, loading } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Mapear los datos de los tweets para asegurarse de que view_count no sea null
  const mappedTweets = tweets.map(tweet => ({
    ...tweet,
    view_count: tweet.view_count ?? 0,
  }));

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Tweets' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-6'>
            <TablaTweets tweets={mappedTweets} users={users} />
          </div>
          <div className='space-y-6'>
            <TweetsPorFecha tweets={mappedTweets} />
            <SegmentacionEmociones tweets={mappedTweets} />
          </div>
          <div className='lg:col-span-4'>
            <div className='w-full h-full'>
              <NubeHastags tweets={mappedTweets} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TweetsPage;