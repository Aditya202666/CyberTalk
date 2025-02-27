import React from 'react'
import { useMessageStore } from '../store/messageStore'
import { useThemeStore } from '../store/themeStore';
import { formatMessageTime } from '../lib/formatMessageTime';

const FriendMessage = ({text, image, timestamp}) => {

  const {selectedFriend} = useMessageStore()
    const { isHovering } = useThemeStore();
  
  return (
    <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className={`w-10 rounded-full border-2 shadow-sm ${
              isHovering ? "shadow-secondary border-secondary" : "shadow-accent border-accent"
            }`}>
                  <img
                    alt="avatar"
                    src={selectedFriend.avatar}
                  />
                </div>
              </div>
              <div className="chat-header">
                {selectedFriend.username}
              </div>
              <div className="chat-bubble flex flex-col">
              <img className="max-w-36 rounded-lg " src={image} alt="" />
              <p>{text}</p>

              </div>
                <time className="text-xs chat-footer opacity-50">{formatMessageTime(timestamp)}</time>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
  )
}

export default FriendMessage
