import { useState, useRef, useEffect } from "react";
import { DateTime } from "luxon";
import { Message } from "@/components/reuseables/chat/Message";
import { MessageBox } from "@/components/reuseables/chat/MessageBox";

export default function TaskComments({
  taskId,
  user,
}: {
  taskId: string;
  user: any;
}) {
  const [comments, setComments] = useState<any[]>([
    {
      id: "c1",
      taskId: taskId || "1",
      comment: "Hey team, I just finished the first draft of the UI mockups. I've attached them in the channel.",
      commenter: "Jane Smith",
      commenterImage: "https://i.pravatar.cc/150?img=47",
      commenterEmail: "jane.smith@example.com",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "c2",
      taskId: taskId || "1",
      comment: "Looks great Jane! Just one quick note: can we make sure the padding on the cards is exactly 16px to match the design system?",
      commenter: "Mark Johnson",
      commenterImage: "https://i.pravatar.cc/150?img=11",
      commenterEmail: "mark.j@example.com",
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "c3",
      taskId: taskId || "1",
      comment: "Good catch Mark. I'll update that right now and push the changes. We can use this to create other modals too.",
      commenter: "Jane Smith",
      commenterImage: "https://i.pravatar.cc/150?img=47",
      commenterEmail: "jane.smith@example.com",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  const [value, setValue] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);

  const commentRef = useRef<HTMLDivElement>(null);
  const commentsFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const addComments = (val: string) => {
    if (!val.trim()) return;
    const date = new Date().toISOString();
    const newComment = {
      id: Math.random().toString(),
      taskId: taskId || "1",
      comment: val,
      commenter: user?.fullname || "You",
      commenterImage: user?.profileImage,
      commenterEmail: user?.email,
      createdAt: date,
      updatedAt: date,
    };
    setComments((prev) => [...prev, newComment]);
    setValue("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] lg:h-[calc(100vh-200px)] w-full relative overflow-hidden pb-4">
      <div ref={commentsFeedRef} className="flex-1 overflow-y-auto pb-4 space-y-4 pr-1 scrollbar-hide">
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            const isMe = comment.commenter === "You" || (user && comment.commenter === user.fullname);
            const dateFormatted = comment.updatedAt 
              ? DateTime.fromISO(comment.updatedAt).toFormat("MMMM dd, yyyy, hh:mm a")
              : DateTime.fromISO(comment.createdAt).toFormat("MMMM dd, yyyy, hh:mm a");
            return (
              <Message
                key={comment.id}
                senderName={comment.commenter}
                senderAvatar={comment.commenterImage}
                content={comment.comment}
                timestamp={dateFormatted}
                isMe={isMe}
                attachedFileName={comment.attachedFileName}
              />
            );
          })
        ) : (
          <div className="w-full text-center py-6 text-gray-500 italic text-[12px]">
            No comments yet...
          </div>
        )}
        <div ref={commentRef} />
      </div>

      <div className="pt-2 border-t border-[#565656]/10 w-full bg-transparent">
        <MessageBox
          value={value}
          onChange={(val) => setValue(val)}
          onSend={() => addComments(value)}
          placeholder="> say something..."
          selectedFile={selectedFiles}
          onFileSelect={(file) => setSelectedFiles(file)}
          isDarkBg={true}
          className="w-full"
        />
      </div>
    </div>
  );
}
