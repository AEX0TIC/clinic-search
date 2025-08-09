import React, { useState, useEffect, useRef } from "react";
import { Doctor } from "../services/doctorService";
import { useFilterParams } from "../utils/urlUtils";

interface SearchBarProps {
  doctors: Doctor[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ doctors }) => {
  const { getParam, setParam } = useFilterParams();
  const [searchTerm, setSearchTerm] = useState(getParam("search") || "");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 3);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setParam("search", name);
    setIsFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setParam("search", searchTerm);
    } else {
      setParam("search", null);
    }
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for doctors..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 search-input text-gray-700"
        />
      </form>

      {isFocused && searchTerm && filteredDoctors.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto"
        >
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(doctor.name)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
            >
              <span className="font-medium text-gray-700">{doctor.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 