import React from "react";
import { SearchBar } from "./SearchBar";
import { DoctorFilter } from "./DoctorFilter";
import { DoctorsList } from "./DoctorsList";
import { useFetchDoctors } from "../services/doctorService";
import { useIsMobile } from "@/hooks/use-mobile";

const DoctorListingPage: React.FC = () => {
  const { data: doctors, isLoading, error } = useFetchDoctors();
  const isMobile = useIsMobile();
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          Find a Doctor
        </h1>
        
        <div className="mb-8">
          <SearchBar doctors={doctors || []} />
        </div>

        {isMobile && (
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="w-full mb-4 bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center"
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        )}

        <div className="layout-container">
          {(!isMobile || showFilter) && (
            <div className="filter-container">
              <DoctorFilter doctors={doctors || []} />
            </div>
          )}

          <div className="doctors-container">
            <DoctorsList
              doctors={doctors || []}
              isLoading={isLoading}
              error={error instanceof Error ? error : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListingPage; 