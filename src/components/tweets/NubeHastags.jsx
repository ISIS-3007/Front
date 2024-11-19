/* eslint-disable react/prop-types */
import WordCloud from 'react-d3-cloud';
import { motion } from "framer-motion";

const NubeHastags = ({ tweets }) => {
  let hashtags = [];

  // Manejar errores al analizar JSON
  try {
    hashtags = tweets.flatMap(tweet => {
      try {
        if (typeof tweet.hashtags === 'string') {
          // Analizar la cadena JSON de hashtags
          const parsedHashtags = JSON.parse(tweet.hashtags);
          if (Array.isArray(parsedHashtags)) {
            return parsedHashtags;
          } else {
            console.error('Hashtags is not an array:', parsedHashtags);
            return [];
          }
        } else {
          console.error('Hashtags is not a string:', tweet.hashtags);
          return [];
        }
      } catch (error) {
        console.error('Error parsing hashtags JSON:', error);
        return [];
      }
    });
  } catch (error) {
    console.error('Error processing tweets:', error);
  }

  const hashtagCounts = hashtags.reduce((acc, hashtag) => {
    acc[hashtag] = (acc[hashtag] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(hashtagCounts).map(key => ({
    text: key,
    value: hashtagCounts[key] * 300 // Ajustar el valor para el tamaño de la fuente
  }));

  const fontSizeMapper = word => word.value * 2; // Aumentar el tamaño de la fuente
  const rotate = () => 0; // No rotar las palabras

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Nube de Hashtags</h2>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <WordCloud
          data={data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          width={600}
          height={200}
        />
      </div>
    </motion.div>
  );
};

export default NubeHastags;