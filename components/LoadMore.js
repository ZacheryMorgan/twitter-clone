export default function LoadMore({ tweets, setTweets }) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        className=" color-accent-contrast bg-color-accent hover:bg-color-accent-hover mt-0 mr-2 justify-self-center rounded-full border px-8 py-2 font-bold "
        onClick={async () => {
          const lastTweetId = tweets[tweets.length - 1].id;
          const res = await fetch(`/api/tweets?take=2&cursor=${lastTweetId}`);
          const data = await res.json();
          setTweets([...tweets, ...data]);
        }}
      >
        Load more tweets
      </button>
    </div>
  );
}
