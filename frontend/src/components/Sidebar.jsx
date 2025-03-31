import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 bg-gray-900 text-white flex flex-col transition-all duration-200">
      {/* Sidebar Header */}
      <div className="border-b border-gray-700 w-full px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-gray-300" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <label className="cursor-pointer flex items-center gap-2 text-sm hidden lg:flex">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm accent-blue-500"
          />
          <span className="text-gray-400">Online Only</span>
        </label>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 px-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all 
                hover:bg-gray-800 
                ${selectedUser?._id === user._id ? "bg-gray-800 ring-1 ring-gray-600" : ""}
              `}
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600">
                <img src={user.profilePic || "/avatar.png"} alt={user.name} className="w-full h-full object-cover" />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
                )}
              </div>

              {/* User Info - Visible only on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <h4 className="text-md font-medium truncate">{user.fullName}</h4>
                <p className={`text-sm ${onlineUsers.includes(user._id) ? "text-green-400" : "text-gray-400"}`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
