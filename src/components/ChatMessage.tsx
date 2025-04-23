
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isIncoming: boolean;
  isOpened?: boolean;
}

const ChatMessage = ({
  content,
  timestamp,
  isIncoming,
  isOpened = false,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex mb-3",
        isIncoming ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-xl p-3 relative",
          isIncoming
            ? "bg-white border border-gray-200"
            : isOpened
            ? "bg-gray-200"
            : "bg-snap-blue text-white"
        )}
      >
        <p className="text-sm">{content}</p>
        <span
          className={cn(
            "text-xs block text-right mt-1",
            isIncoming ? "text-gray-500" : isOpened ? "text-gray-500" : "text-white/70"
          )}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
