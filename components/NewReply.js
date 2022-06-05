import { useRouter } from "next/router";
import { useState } from "react";

const NewReply = ({ tweet }) => {
  const router = useRouter();
  const [reply, setReply] = useState("");

  return (
    <form
      action=""
      onSubmit={async (e) => {
        e.preventDefault();

        if (!reply) {
          alert("Reply must have text");
          return;
        }

        const res = await fetch("/api/tweet", {
          body: JSON.stringify({
            content: reply,
            parent: tweet.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        router.reload(window.location.pathname);
      }}
    >
      <textarea
        className="rounded-lg border-2"
        name=""
        id=""
        cols="30"
        rows="10"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button>Reply</button>
    </form>
  );
};

export default NewReply;
