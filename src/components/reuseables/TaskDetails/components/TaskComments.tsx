import { useState, useRef, useEffect } from "react";
import { DateTime } from "luxon";
import { Message } from "@/components/reuseables/chat/Message";
import { MessageBox } from "@/components/reuseables/chat/MessageBox";
import { useGetTaskCommentsQuery,
          useCreateCommentMutation,
          useDeleteCommentMutation,
          // useUpdateCommentMutation
         } from "@/redux/api/taskApiSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";         

export default function TaskComments({
  taskId,
  user,
}: {
  taskId: string;
  user: any;
}) {

  const [value, setValue] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);

    const { data: commentsData, isLoading } = useGetTaskCommentsQuery(
    { taskId },
    { skip: !taskId }
  );

  const [createComment] = useCreateCommentMutation();
  // const [updateComment] = useUpdateCommentMutation(); 
  const [deleteComment] = useDeleteCommentMutation();
  const comments = commentsData?.comments || commentsData || []


  const commentRef = useRef<HTMLDivElement>(null);
  const commentsFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsFeedRef.current) {
      commentsFeedRef.current.scrollTo({
        top: commentsFeedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [comments]);

  const handleSend = async () => {
    if(!value.trim()) return;

    try {
        await createComment({
          comment: {
          taskId,
          author: user._id,
          content: value,
          }
        }).unwrap()
        setValue('')
    } catch(error: any) {
      showErrorToast({
              message: error?.data?.message || "Failed to create comment",
            });
      // console.log("Failed to create comment:", error)
    }
  }

  // const handleEdit = async () => {
  //   try {
  //     await updateComment({ commentId, content }).unwrap()
  //   } catch(error) {
  //     console.log("Failed to edit comment:", error)
  //   }
  // }

  const handleDelete = async (commentId: string) => {
    try{
      await deleteComment({ commentId }).unwrap()
    } catch(error: any) {
         showErrorToast({
              message: error?.data?.message || "Failed to delete comment",
            });
      // console.log("Failed to update comment:", error)
    }
  }

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden pb-1">
      <div ref={commentsFeedRef} className="flex-1 sm:w-full lg:w-[500px] overflow-y-auto pb-4 space-y-2 pr-1 scrollbar-hide">
        {comments && comments.length > 0 ? (
          comments.map((comment: any) => {
            const isMe = comment.commenter === "You" || (user && comment.commenter === user.fullname);
            const dateFormatted = comment.updatedAt 
              ? DateTime.fromISO(comment.updatedAt).toRelative({ style: "narrow" })
              : DateTime.fromISO(comment.createdAt).toRelative({ style: "narrow" });
            return (
              <Message
                key={comment._id}
                authorId={comment.author._id}
                senderEmail={comment.author.email}
                senderAvatar={comment.author.profileImage}
                content={comment.content}
                timestamp={dateFormatted}
                attachedFileName={comment.attachedFileName}
                edited = {comment.edited}
                loggedInUser={user._id}
                // onEdit={(newContent) => handleEdit(comment._id, newContent)} 
                onDelete={() => handleDelete(comment._id)}
              />
            );
          })
        ) : (
          <div className="w-full text-start py-1 text-gray-500 italic text-[12px]">
            No comments yet...
          </div>
        )}
        <div ref={commentRef} />
      </div>

      <div className="pt-2 sm:w-full lg:w-[500px] bg-transparent">
        <MessageBox
          value={value}
          onChange={(val) => setValue(val)}
          onSend={handleSend}
          placeholder="say something..."
          selectedFile={selectedFiles}
          onFileSelect={(file) => setSelectedFiles(file)}
          isDarkBg={true}
          className="w-full"
        />
      </div>
    </div>
  );
}
