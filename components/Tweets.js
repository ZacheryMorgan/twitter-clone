import Tweet from "./Tweet";

const Tweets = ({ tweets, nolink }) => {
  if (!tweets) return null;

  return (
    <>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} nolink={nolink} />
      ))}
    </>
  );
};

export default Tweets;
