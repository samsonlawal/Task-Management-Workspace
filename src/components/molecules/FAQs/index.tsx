import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How does workspace creation work?",
    answer:
      "You can create workspaces for different teams or projects in seconds. Each workspace has its own dedicated members, tasks, and settings.",
  },
  {
    question: "Can I invite external collaborators and assign roles?",
    answer:
      "Yes! You can invite team members with specific roles such as Admin, Member, or Viewer to maintain control over permissions and access.",
  },
  {
    question: "How does task tracking and status management work?",
    answer:
      "TaskStack provides flexible Kanban boards and list views with custom statuses (To-Do, In-Progress, In-Review, Completed) and priority tags.",
  },
  {
    question: "Is there real-time activity tracking and comments?",
    answer:
      "Every task includes an activity audit log and an integrated comment thread so your team can communicate directly on the task itself.",
  },
  {
    question: "Can I switch between multiple workspaces easily?",
    answer:
      "Yes, the workspace switcher at the top of your sidebar lets you switch between different workspaces instantly with a single click.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="poppins flex h-fit w-full flex-col items-center justify-center py-16 md:py-24">
      <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row md:items-start">
        {/* LHS Header */}
        <div className="flex h-fit w-full flex-col items-center text-center md:items-start md:text-left gap-2.5 md:max-w-[400px]">
          <span className="flex w-fit items-center gap-2 rounded-full border border-[#565656]/20 bg-[#565656]/10 px-3 py-1 text-[11px] font-normal text-white/80 transition-colors">
            <HelpCircle size={11} className="text-zinc-400" />
            <span>FAQs</span>
          </span>
          <h2 className="text-[24px] font-medium leading-[1.2] tracking-tight text-white md:text-[34px]">
            Frequently Asked Questions
          </h2>
          <p className="text-[13px] font-normal text-white/50 md:text-[14px]">
            Everything you need to know about setting up and using TaskStack.
          </p>
        </div>

        {/* RHS - Accordion List (Unified Flat Container) */}
        <div className="w-full flex-1 md:max-w-[580px]">
          <div className="overflow-hidden rounded-[8px] border border-[#565656]/25 bg-[#141414] divide-y divide-[#565656]/20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => toggle(index)}
                  className="cursor-pointer p-4 transition-colors duration-150 hover:bg-[#181818] md:p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[13px] font-medium text-white">
                      {faq.question}
                    </h3>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-[#565656]/25 bg-[#1a1a1a] text-zinc-400">
                      {isOpen ? <Minus size={11} /> : <Plus size={11} />}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2.5 text-[12px] font-normal leading-relaxed text-zinc-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
