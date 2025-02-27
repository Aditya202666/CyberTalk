import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { useUserStore } from "../store/userStore";

const SearchUserInput = () => {
  const { isHovering } = useThemeStore();
  const { searchUsers, clearSearchResults } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Perform search logic here
    if (!searchTerm.trim()) {
      clearSearchResults();
      return;
    }
    searchUsers({ searchTerm: searchTerm });
    console.log("Search term:", searchTerm);
  };

  useEffect(() => {
    // console.log("here");

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div
      className={`relative flex border-2 shadow-inner  rounded-xl p-2 mt-2 mr-1 ${
        isHovering
          ? "shadow-secondary border-secondary"
          : "shadow-accent border-accent "
      }`}
    >
      <input
        className="outline-none w-4/5  bg-base-100"
        type="text"
        name=""
        id=""
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon
        className={`absolute right-2 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all ${
          isHovering ? "text-secondary" : "text-accent "
        }`}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchUserInput;
