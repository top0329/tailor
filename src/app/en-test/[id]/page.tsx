import React from "react";
import Answer from "@/components/shared/answer";
import Question from "@/components/shared/question";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className='flex-1 flex'>
      <Question />
      <Answer />
    </div>
  );
};

export default Page;
