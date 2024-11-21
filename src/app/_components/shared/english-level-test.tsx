"use client";

import { useEffect, useState } from "react";

import Teacher from "./teacher";
import EnglishLevelTestButton from "../buttons/english-level-test-button";
import { useFetch } from "@/app/_helpers/client/useFetch";
import { useLoadingService } from "@/app/_services/useLoadingService";
import { useArticleService } from "@/app/_services";

type AnswerType = {
  question: any;
  answer: string;
};

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
  const { article, setArticle } = useArticleService();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [currentArticleSection, setCurrentArticleSection] =
    useState<string>("A");
  const [answeredQuestions, setAnsweredQuestions] = useState<AnswerType[]>([]);

  useEffect(() => {
    async function getArticle() {
      try {
        setIsLoading(true);
        console.log(article);
        let _articleData;
        switch (currentArticleSection) {
          case "A":
            console.log("A");
            _articleData = await fetch.get("/api/article/?section=A");
            break;
          case "B":
            console.log("B");
            _articleData = await fetch.get("/api/article/?section=B");
            break;
          case "C":
            console.log("C");
            _articleData = await fetch.get("/api/article/?section=C");
            break;
          default:
            console.log("NONE");
            _articleData = await fetch.get("/api/article/?section=A");
            break;
        }
        console.log(_articleData);
        const questionData = await fetch.get(
          `/api/article/question/${_articleData.id}`
        );
        setArticle({
          id: _articleData.id,
          content: _articleData.content,
          section: _articleData.section,
        });
        setQuestionData((prev) => [...prev, ...questionData]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getArticle();
  }, [currentArticleSection]);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);

    setTimeout(() => {
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

  const handleSumitAndNextArticle = (currentSection: string) => {
    console.log(currentSection);
    console.log(currentQuestionNumber);
    console.log(answeredQuestions);
    switch (currentArticleSection) {
      case "A":
        setCurrentArticleSection("B");
        break;
      case "B":
        setCurrentArticleSection("C");
        break;
      case "C":
        console.log("here should be calculating score");
        break;
    }
  };

  return (
    <div className="basis-1/3 flex flex-col m-[24px] rounded-2xl bg-[#ebe7f5] h-[84vh] overflow-y-auto scrollbar">
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
                {currentQuestionNumber === 36 ? (
                  <div>
                    <Teacher text="You have completed all the questions. Please click the button below to get your score." />
                    <div className="flex justify-start mt-2">
                      <EnglishLevelTestButton
                        text="Get Score"
                        className="w-[178px]"
                        isClicked={false}
                        onClick={() =>
                          handleSumitAndNextArticle(article?.section ?? "")
                        }
                      />
                    </div>
                  </div>
                ) : (
                  currentQuestionNumber === questionData.length && (
                    <div>
                      <Teacher text="Well done! Let go to the next article." />
                      <div className="flex justify-start mt-2">
                        <EnglishLevelTestButton
                          text="Submit and next article"
                          className="w-[178px]"
                          isClicked={false}
                          onClick={() =>
                            handleSumitAndNextArticle(article?.section ?? "")
                          }
                        />
                      </div>
                    </div>
                  )
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
