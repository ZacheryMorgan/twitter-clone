import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { signOut } from "next-auth/react";

import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";

import prisma from "lib/prisma";
import { getTweets } from "lib/data";
import LoadMore from "components/LoadMore";

const Home = ({ initialTweets }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  const [tweets, setTweets] = useState(initialTweets);

  // Return nothing while loading
  if (loading) return null;

  // If they are not logged in, send them to login screen
  if (!session) router.push("/");

  // Check for session otherwise session.user would throw undefined error
  if (session && !session.user.name) router.push("/setup");

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <NewTweet tweets={tweets} setTweets={setTweets} />
      <Tweets tweets={tweets} />
      <LoadMore tweets={tweets} setTweets={setTweets} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
