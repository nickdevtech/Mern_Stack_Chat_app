import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-900 text-white">
      <div className="max-w-md text-center space-y-6">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center
            justify-center animate-pulse shadow-lg"
          >
            <MessageSquare className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-gray-200">Welcome to ChitChat!</h2>
        <p className="text-gray-400">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
