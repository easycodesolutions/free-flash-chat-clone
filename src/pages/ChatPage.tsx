
import { useState } from "react";
import { Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const DUMMY_CHATS = [
  { id: 1, name: "Alex Smith", avatar: "/placeholder.svg", lastMessage: "Hey! How are you?", timestamp: "Now", isUnread: true },
  { id: 2, name: "Taylor Swift", avatar: "/placeholder.svg", lastMessage: "Check out my new song", timestamp: "15m", isUnread: true },
  { id: 3, name: "John Doe", avatar: "/placeholder.svg", lastMessage: "Let's meet tomorrow", timestamp: "1h", isUnread: false },
  { id: 4, name: "Emily Johnson", avatar: "/placeholder.svg", lastMessage: "Did you see that?", timestamp: "3h", isUnread: false },
  { id: 5, name: "Michael Brown", avatar: "/placeholder.svg", lastMessage: "Ok, got it", timestamp: "1d", isUnread: false },
];

const ChatPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredChats = DUMMY_CHATS.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full pb-16 bg-white">
      <div className="bg-snap-yellow py-3 px-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Chat</h1>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="w-5 h-5 text-black" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Input 
          placeholder="Search friends" 
          className="rounded-full bg-secondary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id}
            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{chat.name}</span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className={cn(
                  "text-sm",
                  chat.isUnread ? "font-medium" : "text-gray-500"
                )}>
                  {chat.lastMessage}
                </p>
                {chat.isUnread && (
                  <div className="w-2 h-2 rounded-full bg-snap-red"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
