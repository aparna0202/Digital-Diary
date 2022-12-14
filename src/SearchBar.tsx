import { FaSearch } from "react-icons/fa";
import { useState } from "react";
type Props = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchInput, setSearchInput }: Props) => {
  const handleEnterClicked = (e) => {
    if (e.keyCode === 13) {
    }
  };
  return (
    <div className="flex items-center pl-5 gap-3 h-8 lg:h-12 w-[300px] lg:w-[600px] border rounded-2xl  border-slate-800 bg-white ">
      <FaSearch className=" text-sm lg:text-lg" />
      <input
        type="text"
        placeholder="Search Contacts"
        className="lg:h-8 h-7 lg:w-[350px] w-[200px] focus:outline-none"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => handleEnterClicked(e)}
      />
    </div>
  );
};

export default SearchBar;
