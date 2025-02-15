import { Users, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface ChatHeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (value: boolean) => void;
  name:string,
  image?:string
}
const ChatHeader = ({ isNavOpen, setIsNavOpen,name,image }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-3">
        <Users className="h-6 w-6 text-gray-600" />
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="h-6 w-6 text-gray-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ChatHeader;