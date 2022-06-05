import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import prisma from "lib/prisma";
import { getTweets } from "lib/data";
import Tweets from "components/Tweets";

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (session) router.push("/home");

  return (
    <>
      <Tweets tweets={tweets} />
      <div className="mt-10">
        <p className="m-4 border p-4 text-center">
          <h2 className="mb-10">Join the conversation!</h2>
          <Link href="/api/auth/signin">
            <a className="color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker mt-5 rounded-full border px-8 py-2 font-bold">
              login
            </a>
          </Link>
        </p>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const take = 3;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
