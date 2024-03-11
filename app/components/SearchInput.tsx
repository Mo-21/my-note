"use client";
import { Input } from "@nextui-org/react";
import { useNotesContext } from "../hooks/useNotesContext";
import { SearchIcon } from "../assets/SearchIcon";

const SearchInput = () => {
  const { setQuery, query } = useNotesContext();

  return (
    <Input
      fullWidth
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon />}
      type="search"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
};

export default SearchInput;
