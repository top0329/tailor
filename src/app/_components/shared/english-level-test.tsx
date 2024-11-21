"use client";

import { useEffect, useState } from "react";

import Teacher from "./teacher";
import { useFetch } from "@/app/_helpers/client/useFetch";
import { useLoadingService } from "@/app/_services/useLoadingService";
import { useArticleService } from "@/app/_services";
import EnglishLevelTestButton from "../buttons/english-level-test-button";

const formatQuestionText = (questionData: any) => {
  return (
    `Question ${questionData.no}: ${questionData.question}\n\n` +
    `A) ${questionData.a}\n` +
    `B) ${questionData.b}\n` +
    `C) ${questionData.c}\n` +
    `D) ${questionData.d}`
  );
};

const EnglishLevelTest = () => {
  const fetch = useFetch();
  const { setIsLoading } = useLoadingService();
  const { setArticle } = useArticleService();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Array<{
      question: any;
      answer: string;
    }>
  >([]);

  useEffect(() => {
    async function getArticle() {
      try {
        setIsLoading(true);
        const articleData = await fetch.get("/api/article/");
        console.log(articleData.article);
        const questionData = await fetch.get(
          `/api/article/question/${articleData.article.id}`
        );
        console.log(questionData);
        setArticle({
          id: articleData.article.id,
          article: articleData.article.article,
          level: articleData.article.level,
        });
        setQuestionData(questionData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getArticle();
  }, []);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);

    setTimeout(() => {
      // Store current question and answer
      setAnsweredQuestions((prev) => [
        ...prev,
        {
          question: questionData[currentQuestionNumber],
          answer: option,
        },
      ]);

      setSelectedAnswer("");
      setCurrentQuestionNumber((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div className="basis-1/3 flex flex-col m-[24px] rounded-2xl bg-[#ebe7f5] h-[86vh] overflow-y-auto scrollbar">
      <div className="flex-1 flex flex-col gap-[8px] rounded-[16px] border border-first-stroke">
        <div className="bg-extra p-[12px] rounded-t-[16px]">
          <p className="text-invert-foreground font-bold">English Level Test</p>
        </div>
        <div className="p-[16px]">
          <div className="flex flex-col gap-[10px]">
            <Teacher text="Hi, Judy! We are about to administer an English assessment to determine your current level of proficiency." />
            {questionData.length > 0 && (
              <>
                <Teacher
                  text={`I'm going to ask you between ${questionData.length} questions to assess your understanding. Let's get started with the first one, shall we?`}
                />
                <EnglishLevelTestButton
                  isClicked={isStarted}
                  onClick={() => setIsStarted(true)}
                  text="Sure! Lets get started"
                />
              </>
            )}
            {isStarted && (
              <>
                {answeredQuestions.map((qa, index) => (
                  <div key={index}>
                    <Teacher text={formatQuestionText(qa.question)} />
                    <div className="flex justify-end mt-2">
                      <EnglishLevelTestButton
                        text={qa.answer.toUpperCase()}
                        className="w-[42px]"
                        isClicked={true}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                ))}
                {questionData[currentQuestionNumber] && (
                  <>
                    <Teacher
                      text={formatQuestionText(
                        questionData[currentQuestionNumber]
                      )}
                    />
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        {!selectedAnswer &&
                          ["a", "b", "c", "d"].map((option) => (
                            <EnglishLevelTestButton
                              key={option}
                              text={option.toUpperCase()}
                              className="w-[42px]"
                              isClicked={false}
                              onClick={() => handleAnswerSelect(option)}
                            />
                          ))}
                      </div>
                      <div className="flex gap-2">
                        {selectedAnswer && (
                          <EnglishLevelTestButton
                            text={selectedAnswer.toUpperCase()}
                            className="w-[42px]"
                            isClicked={true}
                            onClick={() => {}}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishLevelTest;
