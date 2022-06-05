export const getTweets = async (prisma, take, cursor) => {
  return await prisma.tweet.findMany({
    where: {
      parent: null,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
    take,
    cursor,
    skip: cursor ? 1 : 0,
  });
};

export const getUser = async (prisma) => {
  return await prisma.user.findMany({
    where: {},
  });
};

export const getUserTweets = async (name, prisma) => {
  return await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
      parent: null,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
};

export const getTweet = async (id, prisma) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return tweet;
};

export const getReplies = async (id, prisma) => {
  const replies = await prisma.tweet.findMany({
    where: {
      parent: parseInt(id),
    },
    orderBy: {
      id: "desc",
    },
    include: {
      author: true,
    },
  });

  return replies;
};
