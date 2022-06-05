import prisma from "lib/prisma";
import { getUserTweets } from "lib/data";

import Tweets from "components/Tweets";

const UserProfile = ({ name, tweets }) => {
  return (
    <div>
      <p className="text-center text-xl font-bold">{name}</p>
      {tweets.length === 0 ? (
        <p>User has no tweets</p>
      ) : (
        <Tweets tweets={tweets} />
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let tweets = await getUserTweets(params.name, prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      name: params.name,
      tweets,
    },
  };
}

export default UserProfile;
