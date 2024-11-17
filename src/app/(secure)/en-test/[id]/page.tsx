import React from "react";
import Answer from "@/app/_components/shared/answer";
import Question from "@/app/_components/shared/question";

const Page = ({ params }: { params: { id: string } }) => {
  console.log(params);
  return (
    <div className='flex-1 flex'>
      <Question />
      <Answer />
    </div>
  );
};

export default Page;
