import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { getUser } from "lib/data";
import prisma from "lib/prisma";
import { user } from "pg/lib/defaults";

const Setup = ({ users }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const loading = status === "loading";

  // Return null if not logged in
  if (!session || !session.user) return null;
  if (loading) return null;

  if (!loading && session.user.name) {
    router.push("/home");
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (users.find((user) => user.name === name)) {
          alert("Name already exists");
          return;
        }

        await fetch("/api/setup", {
          body: JSON.stringify({
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        session.user.name = name;
        router.push("/home");
      }}
    >
      <input
        type="text"
        name="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Save</button>
    </form>
  );
};

export default Setup;

export async function getServerSideProps() {
  let users = await getUser(prisma);
  users = JSON.parse(JSON.stringify(users));

  return {
    props: {
      users,
    },
  };
}
