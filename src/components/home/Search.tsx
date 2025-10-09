"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

interface SearchProps {
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  const [searchText, setSearchText] = useState(searchQuery);

  // Debounce search to avoid too many queries
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    // Clear existing timeout
    const timeoutId = setTimeout(() => {
      setSearchQuery(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchQuery("");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <InputGroup className="h-12">
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <SearchIcon />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search wishes by name or description..."
          value={searchText}
          onChange={handleSearchChange}
        />
        {searchText && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={clearSearch} size="icon-xs">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}
