import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-6 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h2 className="text-xl font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300
                shadow-sm hover:shadow-md
                ${theme === t ? "bg-base-200 scale-105 shadow-md" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              {/* Theme Preview Box */}
              <div
                className="relative h-10 w-full rounded-lg overflow-hidden border border-base-300 shadow-sm"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Chat Preview Section */}
        <h3 className="text-xl font-semibold">Chat Preview</h3>
        <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Chat UI with Glassmorphism Effect */}
              <div
                className="bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-base-300"
                style={{ background: "rgba(255, 255, 255, 0.15)" }}
              >
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium shadow-md">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 scrollbar-thin scrollbar-thumb-primary/60 scrollbar-track-transparent">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm transition-all duration-300
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100 flex items-center gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0 shadow-md hover:shadow-lg transition-all">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
