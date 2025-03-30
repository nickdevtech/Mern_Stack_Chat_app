import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Reset form after sending
      setText("");
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Message sending failed!");
    }
  };

  return (
    <div className="p-4 w-full border-t border-gray-800 bg-gray-900">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-700 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-700
              flex items-center justify-center hover:bg-red-500 transition-all"
              type="button"
            >
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex items-center bg-gray-800 rounded-lg px-3">
          <input
            type="text"
            className="w-full bg-transparent p-2 outline-none text-white placeholder-gray-400"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-gray-700 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-6 text-gray-400 hover:text-emerald-500" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-lg transition-all ${
            text.trim() || imagePreview ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="size-6 text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
