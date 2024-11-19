/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchTweets, fetchUsers } from './api';
import { DataContext } from './DataContext';

export const DataProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [tweetsData, usersData] = await Promise.all([fetchTweets(), fetchUsers()]);
        setTweets(tweetsData);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <DataContext.Provider value={{ tweets, users, loading }}>
      {children}
    </DataContext.Provider>
  );
};