"use client";

import React, { useEffect, useState } from "react";

import Article from "@/app/_components/shared/article";
import EnglishLevelTest from "@/app/_components/shared/english-level-test";
import { useFetch } from "@/app/_helpers/client/useFetch";
import ArticleLoading from "./article-loading";
import { useArticleService, useLoadingService } from "@/app/_services";

export type ArticleType = {
  id: number;
  article: string;
  level: string;
};

const Page = () => {
  const { isLoading } = useLoadingService();
  const { article } = useArticleService();

  return (
    <div className="flex-1 flex">
      {isLoading ? <ArticleLoading /> : <Article />}
      <EnglishLevelTest articleId={article?.id} />
    </div>
  );
};

export default Page;
