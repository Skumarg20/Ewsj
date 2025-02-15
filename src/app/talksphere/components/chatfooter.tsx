

import { Search, Upload, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
const ChatFooter = () => {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-50 focus:bg-white transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Upload className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Camera className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
export default ChatFooter;