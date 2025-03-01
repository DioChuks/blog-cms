import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const DashboardHeader: React.FC = () => {
  const location = useLocation();
  const [isSearchable, setIsSearchable] = useState(false);
  // check if the current route is dashboard then dont show search bar
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsSearchable(false);
      return;
    }
    setIsSearchable(true);
    console.log(location.pathname)
  }, [window.location.href])
  
  return (
    <div className="flex justify-center items-center w-full bg-white">
      <header className="flex justify-center w-full max-w-screen-2xl h-14 lg:h-[80px] py-2">
        <div className={`w-full flex ${isSearchable ? 'justify-between': 'justify-end'} items-center lg:px-2 w-full`}>
          <div className={`${isSearchable ? 'flex' : 'hidden'} items-center gap-1 w-[457px] h-10 bg-[#f8f8f8] rounded-[20px] border px-2`}>
            <SearchIcon size={24} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search content"
              className="w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="font-medium">
              <p className="text-base text-gray-500">Admin</p>
              <span className="text-sm text-gray-400">Editor</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
