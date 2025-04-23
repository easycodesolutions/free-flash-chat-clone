
import { useState, useRef, useEffect } from "react";
import { Camera, Image, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageFilters from "./ImageFilters";
import { cn } from "@/lib/utils";

const CameraView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState("");
  
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" }, 
          audio: false 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };
    
    if (isCameraActive) {
      enableCamera();
    }
    
    return () => {
      // Cleanup - stop camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);
  
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/jpeg"));
        setIsCameraActive(false);
      }
    }
  };
  
  const retakePhoto = () => {
    setCapturedImage(null);
    setIsCameraActive(true);
  };
  
  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Image className="w-16 h-16 mb-4 text-snap-yellow" />
        <p className="text-center mb-4">Camera access is needed for Snapchat</p>
        <Button onClick={() => setHasPermission(null)} className="bg-snap-yellow hover:bg-yellow-400 text-black">
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full relative bg-black">
      {isCameraActive && !capturedImage ? (
        <>
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-10 inset-x-0 flex justify-center">
            <button 
              onClick={capturePhoto} 
              className="w-16 h-16 rounded-full border-4 border-white bg-transparent flex items-center justify-center"
              aria-label="Take photo"
            >
              <div className="w-12 h-12 rounded-full bg-white"></div>
            </button>
          </div>
        </>
      ) : (
        capturedImage && (
          <div className="h-full w-full relative">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className={cn("h-full w-full object-cover", currentFilter)}
            />
            <ImageFilters onFilterChange={setCurrentFilter} />
            <div className="absolute bottom-0 inset-x-0 flex justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
              <Button 
                onClick={retakePhoto}
                variant="ghost" 
                size="icon"
                className="bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
              >
                <Camera className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-snap-blue text-white hover:bg-blue-600 rounded-full h-12 w-12"
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CameraView;
