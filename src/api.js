import axios from 'axios';

const API_TWEETS_URL = 'http://167.114.144.233:8000/api/tweets/?format=json';
const API_USERS_URL = 'http://167.114.144.233:8000/api/users/?format=json';

export const fetchTweets = async () => {
  try {
    const response = await axios.get(API_TWEETS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_USERS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};