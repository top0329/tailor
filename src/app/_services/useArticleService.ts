import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ArticleType } from "../(secure)/en-test/page";

export { useArticleService };

const useArticleService = create<ArticleService>()(
  persist(
    (set) => ({
      article: null,
      setArticle: (article: Partial<ArticleType>) =>
        set((state) => ({ article: { ...state.article, ...article } as ArticleType })),
      clearArticle: () => set({ article: null }),
    }),
    {
      name: "article-storage",
    }
  )
);

interface ArticleService {
  article: ArticleType | null;
  setArticle: (article: ArticleType) => void;
  clearArticle: () => void;
}
