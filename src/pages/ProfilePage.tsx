
import { User, Settings, MapPin, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-full pb-16 bg-white">
      <div className="bg-white border-b py-3 px-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold mt-4">Username</h2>
        <div className="flex items-center mt-1 text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">Snapchat Land</span>
        </div>
        
        <div className="flex w-full mt-6 justify-center">
          <div className="text-center mx-4">
            <div className="font-bold">0</div>
            <div className="text-xs text-gray-500">Snaps</div>
          </div>
          <div className="text-center mx-4">
            <div className="font-bold">0</div>
            <div className="text-xs text-gray-500">Friends</div>
          </div>
          <div className="text-center mx-4">
            <div className="font-bold">0</div>
            <div className="text-xs text-gray-500">Score</div>
          </div>
        </div>
        
        <Button className="mt-8 bg-snap-yellow text-black hover:bg-yellow-400 rounded-full">
          Add Friends
        </Button>
      </div>
      
      <div className="px-4 mt-4">
        <h3 className="font-semibold mb-2">Recent Snaps</h3>
        <div className="flex flex-wrap -mx-1">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="w-1/3 p-1">
              <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
