"use client";

import { useRef } from "react";

const OPTForm = () => {
  const inputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement>(null)
  );

  return (
    <div>
      {inputRefs.map((ref, index) => {
        return <input key={index} type='text' maxLength={1} ref={ref} />;
      })}
    </div>
  );
};

export default OPTForm;
