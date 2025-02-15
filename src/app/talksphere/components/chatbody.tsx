import { format } from "date-fns";

type chatBodyProps={
    messages: {
        id: string;
        sender: string;
        text: string;
        timestamp: string;
      }[];
}
const ChatBody = ({messages}:chatBodyProps) => {
 
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-full">
          {format(new Date(), "EEEE, MMMM d")}
        </p>
      </div>
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender=='server' ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
             message.sender=='server'
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-500 text-white"
            }`}
          >
            <p className="break-words">{message.text}</p>
            <span
              className={`text-xs mt-1 block ${
                message.sender=='server' ? "text-gray-500" : "text-blue-50"
              }`}
            >
              {format(message.timestamp, "HH:mm")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatBody;