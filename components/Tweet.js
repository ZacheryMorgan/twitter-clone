import { timeAgo } from "lib/timeago";
import Image from "next/image";
import Link from "next/link";

const Tweet = ({ tweet, nolink }) => {
  const formattedTime = timeAgo.format(new Date(tweet.createdAt));

  return (
    <div className="mb-4">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div className="group block flex-shrink-0">
          <div className="flex items-center">
            <div>
              {tweet.author.image && (
                <Image
                  className="h-64 w-64 rounded-full"
                  src={tweet.author.image}
                  alt=""
                  width="40"
                  height="40"
                />
              )}
            </div>
            <div className="ml-3 -mt-6">
              <p className="">
                <Link href={`/${tweet.author.name}`}>
                  <a>
                    <span className="color-primary cursor-pointer text-base font-medium leading-6 hover:underline">
                      {tweet.author.name}
                    </span>
                  </a>
                </Link>
                {nolink ? (
                  <span>{formattedTime}</span>
                ) : (
                  <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
                    <span className="color-dimmed pl-1 text-sm font-light leading-5">
                      <a className="hover:underline">{formattedTime}</a>
                    </span>
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-6 pl-16">
        <p className="color-primary width-auto flex-shrink pl-1 pr-2 text-base font-normal">
          {tweet.content}
        </p>
      </div>
    </div>
  );
};

export default Tweet;
