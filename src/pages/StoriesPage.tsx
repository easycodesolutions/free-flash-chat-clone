
import { useState } from "react";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DUMMY_STORIES = [
  { id: 1, username: "alex_smith", hasStory: true, avatar: "/placeholder.svg", viewed: false },
  { id: 2, username: "taylor_swift", hasStory: true, avatar: "/placeholder.svg", viewed: true },
  { id: 3, username: "john_doe", hasStory: true, avatar: "/placeholder.svg", viewed: false },
  { id: 4, username: "emily_johnson", hasStory: false, avatar: "/placeholder.svg", viewed: false },
  { id: 5, username: "michael_brown", hasStory: true, avatar: "/placeholder.svg", viewed: true },
];

const StoriesPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const navigate = useNavigate();
  
  const handleStoryClick = (storyId: number) => {
    navigate(`/stories/${storyId}`);
  };
  
  return (
    <div className="flex flex-col h-full pb-16 bg-white">
      <div className="bg-snap-purple py-3 px-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">Stories</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-white">
          <Search className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'friends' ? 'text-snap-purple border-b-2 border-snap-purple' : 'text-gray-500'}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'discover' ? 'text-snap-purple border-b-2 border-snap-purple' : 'text-gray-500'}`}
          onClick={() => setActiveTab('discover')}
        >
          Discover
        </button>
      </div>
      
      {activeTab === 'friends' && (
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-3">MY STORY</h2>
            <div className="flex items-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="w-6 h-6 rounded-full bg-snap-purple absolute -bottom-1 -right-1 flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="font-medium">Add to My Story</div>
                <div className="text-xs text-gray-500">Tap to add</div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-3">FRIENDS</h2>
            {DUMMY_STORIES.map((story) => (
              <div key={story.id} className="flex items-center mb-4">
                <div className="relative">
                  <div 
                    onClick={() => story.hasStory && handleStoryClick(story.id)} 
                    className={`w-14 h-14 rounded-full border-2 ${
                      story.hasStory 
                        ? story.viewed 
                          ? 'border-gray-300' 
                          : 'border-snap-purple' 
                        : 'border-transparent'
                    } p-0.5 ${story.hasStory ? 'cursor-pointer' : ''}`}
                  >
                    <img 
                      src={story.avatar} 
                      alt={story.username} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{story.username}</div>
                  <div className="text-xs text-gray-500">
                    {story.hasStory 
                      ? story.viewed 
                        ? 'Viewed' 
                        : 'New Story' 
                      : 'No Story'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'discover' && (
        <div className="p-4">
          <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center h-40">
            <p className="text-center text-gray-500">
              Discover content would go here.
              <br />
              Not implemented in this MVP.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
