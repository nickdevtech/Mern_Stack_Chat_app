import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-gray-700 bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Side: Avatar & User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar with subtle border */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600 shadow-md">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover w-full h-full"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id) ? "text-green-400" : "text-gray-400"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right Side: Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-300 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
