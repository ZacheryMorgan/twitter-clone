import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // Create session variable passing in the request
  const session = await getSession({ req });

  // If there is no session, then display the message that they are not logged in
  if (!session) return res.status(401).json({ msg: "Not logged in" });

  // Finds user in prisma with email of the session.user.email and assigns to variable user
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // If there is no user, then return 'User not found'
  if (!user) return res.status(401).json({ msg: "User not found" });

  // Handle what to do after a post method is sent
  if (req.method === "POST") {
    const tweet = await prisma.tweet.create({
      data: {
        content: req.body.content,
        parent: req.body.parent || null,
        author: {
          connect: { id: user.id },
        },
      },
    });

    const tweetWithAuthorData = await prisma.tweet.findUnique({
      where: {
        id: tweet.id,
      },
      include: {
        author: true,
      },
    });

    res.json(tweetWithAuthorData);
    return;
  }

  if (req.method === "DELETE") {
    const id = req.body.id;

    const tweet = await prisma.tweet.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (tweet.author.id !== user.id) {
      return res.status(401).end();
    }

    await prisma.tweet.delete({
      where: { id },
    });

    return res.status(200).end();
  }
}
