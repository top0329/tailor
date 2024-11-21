"use client";

import React from "react";

import Article from "@/app/_components/shared/article";
import EnglishLevelTest from "@/app/_components/shared/english-level-test";
import ArticleLoading from "./article-loading";
import { useLoadingService } from "@/app/_services";

export type ArticleType = {
  id: number;
  content: string;
  section: string;
};

const Page = () => {
  const { isLoading } = useLoadingService();

  return (
    <div className="flex-1 flex">
      {isLoading ? <ArticleLoading /> : <Article />}
      <EnglishLevelTest />
    </div>
  );
};

export default Page;
