import { useState } from "react";
import ChatHeader from "./chatheader";
import ChatBody from "./chatbody";
import ChatFooter from "./chatfooter";


const messages=[
    {
      id: "1",
      sender: "server",
      text: "Hey! How’s the preparation going?",
      timestamp: "2024-02-10T09:30:00Z",
    },
    {
      id: "2",
      sender: "client",
      text: "Pretty good! I just finished my morning study session.",
      timestamp: "2024-02-10T09:32:00Z",
    },
    {
      id: "3",
      sender: "server",
      text: "Nice! What subject were you working on?",
      timestamp: "2024-02-10T09:35:00Z",
    },
    {
      id: "4",
      sender: "client",
      text: "Physics! Went through some mechanics problems.",
      timestamp: "2024-02-10T09:40:00Z",
    },
    {
      id: "5",
      sender: "server",
      text: "That's great! Let me know if you need any help.",
      timestamp: "2024-02-10T09:45:00Z",
    },
    {
      id: "6",
      sender: "client",
      text: "Thanks! I’ll reach out if I get stuck.",
      timestamp: "2024-02-10T09:50:00Z",
    },
  ];
  
const ChatComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ChatHeader isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} name='hello'  />
      <ChatBody messages={messages} />
      <ChatFooter />
    </div>
  );
};
export default ChatComponent;