/* eslint-disable react/prop-types */
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

const GrafoUsuarios = ({ users, tweets }) => {
  const userIds = new Set(users.map(user => user.twitter_id));

  const nodes = users.map(user => ({
    id: user.twitter_id,
    name: user.username,
    group: 'user',
    color: '#888' 
  }));

  const links = tweets
    .filter(tweet => tweet.parent_tweet !== null)
    .map(tweet => {
      const user2 = tweet.user;
      const parentTweet = tweets.find(t => t.tweet_id === tweet.parent_tweet);
      if (parentTweet && userIds.has(parentTweet.user)) {
        const user1 = parentTweet.user;

        const node = nodes.find(n => n.id === user2);
        if (tweet.polarity === 'negative') {
          node.color = '#FF0000'; 
        } else if (tweet.polarity === 'positive') {
          node.color = '#00FF00'; 
        }

        return {
          source: user2,
          target: user1,
          polarity: tweet.polarity
        };
      }
      return null;
    })
    .filter(link => link !== null); 

  return (
    <ForceGraph3D
      graphData={{ nodes, links }}
      nodeAutoColorBy="group"
      linkDirectionalParticles={4}
      linkDirectionalParticleSpeed={d => d.value * 0.001}
      nodeThreeObject={node => {
        const sprite = new SpriteText(node.name);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
    />
  );
};

export default GrafoUsuarios;