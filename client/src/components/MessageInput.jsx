import { CrossIcon, ImageIcon, Send } from "lucide-react";
import React, { useRef, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { useMessageStore } from "../store/messageStore";

const MessageInput = () => {
  const { isHovering } = useThemeStore();
  const { sendMessage, isSendingMessage } = useMessageStore();
  const imageInputRef = useRef(null);

  const [textMessage, setTextMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageInput = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleCancelImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!textMessage.trim() && !imagePreview) return;

    const message = {
      text: textMessage.trim(),
      image: imagePreview,
    };

    sendMessage(message);
    handleCancelImage();
    setTextMessage("");
  };
  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center gap-2 relative">
        <div
          className={`absolute bottom-14 right-2 ${
            imagePreview ? "block" : "hidden"
          } `}
          onClick={handleCancelImage}
        >
          <img
            className={`size-32 object-cover bg-accent rounded-lg border-2 shadow-sm ${
              isHovering ? "shadow-secondary border-secondary" : "shadow-accent border-accent"
            } `}
            src={imagePreview}
            alt=""
          />
          <CrossIcon className="absolute z-1 top-0 right-0 size-6 rotate-45 p-1 shadow-md  shadow-red-500  bg-red-600 rounded-full active:scale-90 transition-all hover:scale-105" />
        </div>

        <div
          className={`flex gap-2 px-4 bg-base-200 py-2 rounded-lg w-full shadow-inner  ${
            isHovering ? "shadow-secondary" : "shadow-accent"
          }`}
        >
          <input
            className="outline-none border-none bg-base-200 w-full"
            type="text"
            name="message"
            id="message"
            placeholder="Type Something..."
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
          />
          <label htmlFor="avatar-upload">
            <ImageIcon className="size-6 hover:text-secondary transition-colors " />
            <input
              type="file"
              id="avatar-upload"
              ref={imageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageInput}
              // disabled={isUpdatingAvatar}
            />
          </label>{" "}
        </div>

        <button
          className={`p-2  rounded-xl  group hover:scale-105 shadow-inner  ${
            isHovering ? "shadow-secondary" : "shadow-accent"
          } ${
            isSendingMessage ? "animate-pulse" : ""
          } transition transform active:scale-90 duration-150`}
          onClick={handleSendMessage}
          disabled={isSendingMessage}
        >
          <Send />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
