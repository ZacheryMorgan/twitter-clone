import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const NewTweet = ({ tweets, setTweets }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");

  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("No content");
      return;
    }

    const res = await fetch("/api/tweet", {
      body: JSON.stringify({
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const tweet = await res.json();
    setTweets([tweet, ...tweets]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mt-2 mr-1 ml-1 flex-1 px-1 pt-2">
            <textarea
              className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none"
              name="content"
              cols="50"
              rows="2"
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-5 flex-1">
            <button className="float-right mt-0 mr-2 rounded-full border px-8 py-2 font-bold">
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTweet;
