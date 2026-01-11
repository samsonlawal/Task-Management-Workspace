import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How does workspace creation work?",
    answer: "You can create a workspace and invite members using their email.",
  },
  {
    question: "Can I invite multiple members?",
    answer: "Yes, you can invite multiple members with different roles.",
  },
  {
    question: "Who can create tasks?",
    answer: "Only members with the right permissions can create tasks.",
  },
  {
    question: "How does workspace creation work?",
    answer: "You can create a workspace and invite members using their email.",
  },
  {
    question: "Can I invite multiple members?",
    answer: "Yes, you can invite multiple members with different roles.",
  },
  {
    question: "Who can create tasks?",
    answer: "Only members with the right permissions can create tasks.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="poppins flex h-fit w-full flex-col items-center justify-center gap-3 pt-[0px] md:gap-[8px]">
      <div className="flex h-[500px] w-full flex-col items-start justify-center gap-6 py-10 md:flex-row">
        {/* LHS */}
        <div className="poppins flex h-fit w-full flex-col gap-3 md:w-[450px] md:gap-[8px]">
          <div className="flex flex-col gap-2">
            <h1 className="text-[26px] leading-[1.2] text-[#fff] md:text-[40px]">
              Frequently Asked Questions
            </h1>
            <p className="text-[15px] font-regular text-[#fff]/30">
              Got Questions? We’ve got answers. Here are some of the most common
              questions people ask about TaskStack.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[10px] text-[14px] font-regular text-white transition-colors duration-300 hover:bg-[#565656]/20">
            Ask Any Question
            {/* <img
              src="/icons/caret-right.svg"
              alt=""
              className="h-[16px] w-[16px]"
            /> */}
          </button>
        </div>
        {/* RHS- Questions */}
        <div className="flex items-start justify-start">
          <div className="rounded-[14px] bg-[#1a1a1a] p-[30px]">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`w-[500px] cursor-pointer rounded-lg border border-[#565656]/20 bg-[#111] p-4 transition-all duration-300 hover:bg-[#565656]/10 ${openIndex === index ? "bg-[#565656]/10" : ""}`}
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] text-[#fff]">{faq.question}</h3>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 0 : 180 }}
                      transition={{ duration: 0.3 }}
                      className="text-[15px] text-[#fff]/20"
                    >
                      {openIndex === index ? "−" : "+"}
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-2 overflow-hidden"
                      >
                        <p className="text-sm text-[#fff]/30">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
