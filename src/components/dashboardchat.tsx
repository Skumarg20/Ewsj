import { MessageCircleQuestion } from "lucide-react";

type Props = {
  onStartChat: () => void;
}

export default function DashBoardChat({ onStartChat }: Props) {
  return (
    <div className="w-[100%] bg-white rounded-2xl shadow-xl overflow-hidden p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-indigo-100 p-1 rounded-full">
          <MessageCircleQuestion className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Stuck on Something?
      </h2>
      <h3 className="text-xl text-center text-indigo-600 font-semibold mb-6">
        I&apos;m Here to Help! 🧑‍🏫
      </h3>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl">
        <p className="text-gray-600 text-center">
          Feel free to ask any questions. I&apos;m here to assist you with your coding journey!
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={onStartChat}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}