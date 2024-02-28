"use client";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useNotesContext } from "../hooks/useNotesContext";
import { SearchIcon } from "../assets/SearchIcon";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { setQuery } = useNotesContext();

  return (
    <Input
      fullWidth
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon />}
      type="search"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setQuery(e.target.value);
      }}
    />
  );
};

export default SearchInput;
