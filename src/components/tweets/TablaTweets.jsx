import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { Search, MessageCircle, Heart, Repeat2, ChartNoAxesCombined, Angry, Smile, Meh, RefreshCcw } from "lucide-react";

const TablaTweets = ({ tweets, users, setFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPolarity, setSelectedPolarity] = useState("all");
  const tweetsPerPage = 3;

  useEffect(() => {
    let filtered = tweets;
    if (selectedPolarity !== "all") {
      filtered = tweets.filter(tweet => tweet.polarity === selectedPolarity);
    }
    const sortedTweets = filtered.sort((a, b) => b.like_count - a.like_count);
    setFilteredTweets(sortedTweets);
  }, [tweets, selectedPolarity]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tweets.filter(
      (tweet) => tweet.raw_content.toLowerCase().includes(term)
    );
    const sortedFiltered = filtered.sort((a, b) => sortOrder === "asc" ? a.like_count - b.like_count : b.like_count - a.like_count);
    setFilteredTweets(sortedFiltered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (order) => {
    const sortedTweets = [...filteredTweets].sort((a, b) => {
      if (order === "asc") {
        return a.like_count - b.like_count;
      } else {
        return b.like_count - a.like_count;
      }
    });
    setFilteredTweets(sortedTweets);
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page on sort
  };

  const handlePolarityChange = (e) => {
    setSelectedPolarity(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleReload = () => {
    setSearchTerm("");
    setSelectedPolarity("all");
    setSortOrder("desc");
    const sortedTweets = tweets.sort((a, b) => b.like_count - a.like_count);
    setFilteredTweets(sortedTweets);
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = filteredTweets.slice(indexOfFirstTweet, indexOfLastTweet);

  const totalPages = Math.ceil(filteredTweets.length / tweetsPerPage);
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getUserInfo = (userId) => {
    return users.find(user => user.twitter_id === userId) || {};
  };

  const getPolarityIcon = (polarity) => {
    if (polarity === "negative") {
      return <Angry className="text-red-500" />;
    } else if (polarity === "positive") {
      return <Smile className="text-green-500" />;
    } else {
      return <Meh className="text-blue-500" />;
    }
  };

  const handleTweetClick = (userId) => {
    if (userId) {
      const user = users.find(user => user.twitter_id === userId);
      setFilteredUsers(user ? [user] : []);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Tweets</h2>
        <div className='flex items-center'>
          <button
            className='bg-gray-700 text-white rounded-lg px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={() => handleSort(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search tweets...'
              className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
          <select
            value={selectedPolarity}
            onChange={handlePolarityChange}
            className='bg-gray-700 text-white rounded-lg px-3 py-2 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <button
            className='bg-gray-700 text-white rounded-lg px-3 py-2 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={handleReload}
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        {currentTweets.map((tweet) => {
          const user = getUserInfo(tweet.user_id);
          return (
            <motion.div
              key={tweet.tweet_id}
              className='bg-gray-700 p-4 rounded-lg mb-4 cursor-pointer relative'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              onClick={() => handleTweetClick(tweet.user_id)}
            >
              <div className="absolute top-2 right-2">
                {getPolarityIcon(tweet.polarity)}
              </div>
              <div className='flex items-center mb-2'>
                <img src={user.profile_image_url} alt={user.username} className='w-10 h-10 rounded-full mr-3' />
                <div className='flex-1'>
                  <div className='text-sm font-medium text-gray-100'>
                    {user.displayname}
                    <a href={tweet.url} target="_blank" rel="noopener noreferrer" className='text-xs text-blue-500 ml-2'>Visitar</a>
                  </div>
                  <div className='text-xs text-gray-400'>@{user.username}</div>
                </div>
              </div>
              <div className='text-sm font-medium text-gray-100 mb-2'>{tweet.raw_content}</div>
              <div className='flex justify-between text-gray-400 text-xs'>
                <span className='flex items-center'><MessageCircle className='mr-1' /> {tweet.reply_count || 0}</span>
                <span className='flex items-center'><Repeat2 className='mr-1' /> {tweet.retweet_count || 0}</span>
                <span className='flex items-center'><Heart className='mr-1' /> {tweet.like_count || 0}</span>
                <span className='flex items-center'><ChartNoAxesCombined className='mr-1' /> {tweet.view_count || 0}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className='flex justify-center mt-4'>
        <button
          onClick={() => paginate(currentPage - 1)}
          className='mx-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-300'
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => paginate(startPage + i)}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className='mx-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-300'
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </motion.div>
  );
};

TablaTweets.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      tweet_id: PropTypes.string.isRequired,
      raw_content: PropTypes.string.isRequired,
      like_count: PropTypes.number.isRequired,
      reply_count: PropTypes.number.isRequired,
      retweet_count: PropTypes.number.isRequired,
      view_count: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      twitter_id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      displayname: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired, // Add this line
    })
  ).isRequired,
};

export default TablaTweets;