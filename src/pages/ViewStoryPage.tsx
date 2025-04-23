
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";

// Placeholder dummy stories data
const DUMMY_STORY_CONTENT = [
  { id: 1, username: "alex_smith", avatar: "/placeholder.svg", images: ["/placeholder.svg", "/placeholder.svg"] },
  { id: 2, username: "taylor_swift", avatar: "/placeholder.svg", images: ["/placeholder.svg"] },
  { id: 3, username: "john_doe", avatar: "/placeholder.svg", images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"] },
];

const ViewStoryPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [activeStory, setActiveStory] = useState<typeof DUMMY_STORY_CONTENT[0] | undefined>(
    DUMMY_STORY_CONTENT.find(story => story.id === Number(userId))
  );
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Get story content for the user
  useEffect(() => {
    if (!activeStory) {
      navigate('/stories');
      return;
    }
    
    // Reset progress when story changes
    setProgress(0);
    setActiveImageIndex(0);
  }, [activeStory, navigate]);
  
  // Progress bar animation
  useEffect(() => {
    if (!activeStory) return;
    
    const storyDuration = 5000; // 5 seconds per story
    const interval = 100; // Update progress every 100ms
    const increment = (interval / storyDuration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          // Move to next image or close if last
          if (activeImageIndex < activeStory.images.length - 1) {
            setActiveImageIndex(prev => prev + 1);
            return 0;
          } else {
            navigate('/stories');
            return 100;
          }
        }
        return prevProgress + increment;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [activeStory, activeImageIndex, navigate]);
  
  // Close story and navigate back
  const handleClose = () => {
    navigate('/stories');
  };
  
  // Handle taps for navigation
  const handleTap = (e: React.MouseEvent) => {
    const { clientX } = e;
    const screenWidth = window.innerWidth;
    
    if (clientX < screenWidth / 3) {
      // Left third - go back
      if (activeImageIndex > 0) {
        setActiveImageIndex(prev => prev - 1);
        setProgress(0);
      } else {
        // First image, close
        handleClose();
      }
    } else if (clientX > (screenWidth * 2) / 3) {
      // Right third - go forward
      if (activeStory && activeImageIndex < activeStory.images.length - 1) {
        setActiveImageIndex(prev => prev + 1);
        setProgress(0);
      } else {
        // Last image, close
        handleClose();
      }
    }
  };
  
  if (!activeStory) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50" onClick={handleTap}>
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 z-10">
        {activeStory.images.map((_, index) => (
          <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            {index === activeImageIndex && (
              <div 
                className="h-full bg-white" 
                style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
              />
            )}
            {index < activeImageIndex && (
              <div className="h-full bg-white w-full" />
            )}
          </div>
        ))}
      </div>
      
      {/* Header */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden">
            <img 
              src={activeStory.avatar} 
              alt={activeStory.username} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="ml-2 text-white font-medium">{activeStory.username}</span>
        </div>
        <button onClick={handleClose} className="text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Story content */}
      <div className="flex-1 flex items-center justify-center">
        <img 
          src={activeStory.images[activeImageIndex]} 
          alt="Story" 
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ViewStoryPage;
