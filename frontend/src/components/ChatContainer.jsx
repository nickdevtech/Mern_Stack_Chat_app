import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-900">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <ChatHeader />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-3 ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar */}
            {message.senderId !== authUser._id && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-600 shadow-md">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="profile pic"
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`relative max-w-[75%] px-4 py-3 rounded-xl shadow-md ${
                message.senderId === authUser._id
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-300 rounded-bl-none"
              }`}
            >
              {/* Message Timestamp */}
              <div className="absolute top-0 right-2 text-xs text-gray-400 mt-1">
                {formatMessageTime(message.createdAt)}
              </div>

              {/* Image Attachments */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="rounded-md mt-2 max-w-[250px] transition-transform duration-300 hover:scale-105"
                />
              )}

              {/* Text Message */}
              {message.text && <p className="mt-1">{message.text}</p>}
            </div>

            {/* Spacer for sent messages */}
            {message.senderId === authUser._id && <div className="w-10 h-10" />}
          </div>
        ))}

        {/* Scroll to Bottom */}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
