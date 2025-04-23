
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Image, Send, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "@/components/ChatMessage";

const ChatDetailPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  const dummyMessages = [
    { id: 1, content: "Hey, how's it going?", timestamp: "10:30 AM", isIncoming: true, isOpened: true },
    { id: 2, content: "Not bad! Just checking out this new Snapchat clone app", timestamp: "10:32 AM", isIncoming: false, isOpened: true },
    { id: 3, content: "It looks pretty cool!", timestamp: "10:32 AM", isIncoming: true, isOpened: true },
    { id: 4, content: "Yeah, I'm impressed with the features so far", timestamp: "10:33 AM", isIncoming: false, isOpened: true },
    { id: 5, content: "Want to meet up later?", timestamp: "10:40 AM", isIncoming: true, isOpened: true },
  ];
  
  const handleSend = () => {
    if (message.trim() === "") return;
    // In a real app, we would send the message here
    setMessage("");
  };
  
  return (
    <div className="flex flex-col h-full pb-16 bg-gray-50">
      <div className="bg-snap-blue py-3 px-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 text-white" onClick={() => navigate('/chat')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="font-medium text-white">
            {chatId === "1" ? "Alex Smith" : chatId === "2" ? "Taylor Swift" : "Chat"}
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="text-white">
            <VideoIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        {dummyMessages.map(msg => (
          <ChatMessage
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            isIncoming={msg.isIncoming}
            isOpened={msg.isOpened}
          />
        ))}
      </div>
      
      <div className="p-3 border-t bg-white">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Camera className="w-5 h-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a chat"
            className="flex-1 mx-2 rounded-full"
          />
          <Button
            onClick={handleSend}
            disabled={message.trim() === ""}
            variant="ghost"
            size="icon"
            className={message.trim() === "" ? "text-gray-400" : "text-snap-blue"}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
