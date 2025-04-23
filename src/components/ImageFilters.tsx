
import { useState } from "react";
import { cn } from "@/lib/utils";

type FilterOption = {
  id: string;
  name: string;
  className: string;
};

const filterOptions: FilterOption[] = [
  { id: "normal", name: "Normal", className: "" },
  { id: "grayscale", name: "B&W", className: "grayscale" },
  { id: "sepia", name: "Retro", className: "sepia" },
  { id: "saturate", name: "Vivid", className: "saturate-[1.5]" },
  { id: "contrast", name: "Contrast", className: "contrast-125" },
  { id: "hue-yellow", name: "Yellow", className: "hue-rotate-[15deg]" },
  { id: "hue-blue", name: "Blue", className: "hue-rotate-[180deg]" }
];

interface ImageFiltersProps {
  onFilterChange: (filterClass: string) => void;
}

const ImageFilters = ({ onFilterChange }: ImageFiltersProps) => {
  const [selectedFilter, setSelectedFilter] = useState("normal");
  
  const handleFilterSelect = (filter: FilterOption) => {
    setSelectedFilter(filter.id);
    onFilterChange(filter.className);
  };
  
  return (
    <div className="absolute left-0 bottom-24 right-0">
      <div className="flex overflow-x-auto space-x-2 p-2 bg-black/30 backdrop-blur-sm scrollbar-hide">
        {filterOptions.map(filter => (
          <div 
            key={filter.id}
            onClick={() => handleFilterSelect(filter)}
            className={cn(
              "flex flex-col items-center justify-center min-w-16 py-1",
              "cursor-pointer rounded-lg transition duration-150",
              selectedFilter === filter.id ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <div className={cn("w-full h-full bg-gradient-to-r from-snap-purple to-snap-blue", filter.className)}></div>
            </div>
            <span className="text-xs text-white mt-1">{filter.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageFilters;
