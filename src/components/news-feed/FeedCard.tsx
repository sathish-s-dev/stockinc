import type { NewsArticle } from "@/types";
import { Link } from "react-router";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Share } from "react-feather";
import { motion } from "motion/react";

interface NewsFeedProps {
  article: NewsArticle;
}

const MotionLink = motion(Link);

const NewsFeed = ({ article }: NewsFeedProps) => {
  if (!article) return null;

  return (
    <MotionLink
      initial="hidden"
      whileHover="visible"
      to={`/feed/${article.title}`}
      className="max-w-xs h-full block"
    >
      <Card className="h-full bg-white dark:bg-dark-foreground dark:shadow-gray-50/50 dark:text-gray-100 flex flex-col">
        <CardHeader className="space-y-4">
          <img
            src={article.banner_image}
            className="h-48 object-cover"
            alt={article.title}
          />
          <CardTitle className="line-clamp-3">{article.title}</CardTitle>
        </CardHeader>

        <CardFooter className="mt-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <img
              src={article.banner_image}
              alt={article.authors.join()}
              className="size-8 rounded-full"
            />
            <p>{article.authors}</p>
          </div>
          <div>
            <button className=" p-1">
              <Share size={16} />
            </button>
          </div>
        </CardFooter>
      </Card>
    </MotionLink>
  );
};

export default NewsFeed;
