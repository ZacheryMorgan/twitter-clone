import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  // If they are not logged in return res.end()
  if (!session) return res.end();

  if (req.method === "POST") {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: req.body.name,
      },
    });

    res.end();
  }
};

export default handler;
