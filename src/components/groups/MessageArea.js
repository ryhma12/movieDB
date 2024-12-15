import { useState, useEffect, useRef } from "react";
import { useSendMessage } from "../../hooks/groups/useSendMessage";
import { useGetMessages } from "../../hooks/groups/useGetMessages";
import RoundPhoto from "../RoundPhoto";
import LinkMessage from "./LinkMessage";

const isLink = (message) => {
  const urlRegex = /^(https?:\/\/[^\s]+)/g;
  return urlRegex.test(message);
};

const MessageArea = ({ user, selectedGroup, setSelectedMovie }) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const [triggerFetchMessages, setTriggerFetchMessages] = useState(false);
  const { getMessages, data: messagesData } = useGetMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages(selectedGroup);
    };
    fetchMessages();
  }, [getMessages, triggerFetchMessages, selectedGroup]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messagesData.result]);

  const handleMessage = () => {
    sendMessage(user.Name, selectedGroup, message, user.token);
    setMessage("");
    setTriggerFetchMessages(!triggerFetchMessages);
  };

  return (
    <div className="MessageArea">
      <div className="content">
        {messagesData.result &&
          messagesData.result.map((message, index) => (
            <div className="message" key={index}>
              <RoundPhoto />
              <div className="text--container">
                <div className="sender">
                  <span>{message.sender_name}</span>
                  <span className="time">{message.message_date}</span>
                </div>
                <span className="message--content">
                  {isLink(message.message_content) ? (
                    <LinkMessage
                      link={message.message_content}
                      setSelectedMovie={setSelectedMovie}
                    />
                  ) : (
                    message.message_content
                  )}
                </span>
              </div>
            </div>
          ))}
        <div ref={lastMessageRef} />
      </div>
      <div className="user--input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMessage();
          }}
        />
      </div>
    </div>
  );
};

export default MessageArea;
