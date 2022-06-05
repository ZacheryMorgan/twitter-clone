import prisma from "lib/prisma";
import { getReplies, getTweet } from "lib/data";
import Tweet from "components/Tweet";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import NewReply from "components/NewReply";
import Tweets from "components/Tweets";

const SingleTweet = ({ tweet, replies }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (typeof window !== "undefined" && tweet.parent) {
    router.push(`/${tweet.author.name}/status/${tweet.parent}`);
  }

  return (
    <div>
      <Tweet tweet={tweet} />
      {session && session.user.email === tweet.author.email && (
        <div>
          <a
            href="#"
            onClick={async () => {
              const res = await fetch("/api/tweet", {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "DELETE",
              });

              if (res.status === 401) {
                alert("Unauthorized");
              }

              if (res.status === 200) {
                router.push("/home");
              }
            }}
          >
            delete
          </a>
        </div>
      )}
      <NewReply tweet={tweet} />
      <Tweets tweets={replies} nolink={true} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let replies = await getReplies(params.id, prisma);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies,
    },
  };
}

export default SingleTweet;
