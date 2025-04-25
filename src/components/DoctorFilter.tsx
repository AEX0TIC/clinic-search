import React from "react";
import { Doctor } from "../services/doctorService";
import { useFilterParams } from "../utils/urlUtils";

interface DoctorFilterProps {
  doctors: Doctor[];
}

export const DoctorFilter: React.FC<DoctorFilterProps> = ({ doctors }) => {
  const { getParam, getArrayParam, setParam, setArrayParam } = useFilterParams();

  // Get unique specialties from the doctors data
  const specialties = React.useMemo(() => {
    const allSpecialties = doctors.flatMap((doctor) => 
      doctor.specialities ? doctor.specialities.map(s => s.name) : []
    );
    return Array.from(new Set(allSpecialties)).sort();
  }, [doctors]);

  const selectedConsultType = getParam("consultType");
  const selectedSpecialties = getArrayParam("specialties");
  const sortBy = getParam("sortBy");

  const handleConsultTypeChange = (type: string) => {
    setParam("consultType", type);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const isSelected = selectedSpecialties.includes(specialty);
    if (isSelected) {
      setArrayParam(
        "specialties",
        selectedSpecialties.filter((s) => s !== specialty)
      );
    } else {
      setArrayParam("specialties", [...selectedSpecialties, specialty]);
    }
  };

  const handleSortChange = (sort: string) => {
    setParam("sortBy", sort);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc"
          className="font-semibold text-lg mb-3 text-gray-800"
        >
          Consultation Mode
        </h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              value="video"
              checked={selectedConsultType === "video"}
              onChange={() => handleConsultTypeChange("video")}
              className="radio-custom mr-3"
            />
            <span className="text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              value="clinic"
              checked={selectedConsultType === "clinic"}
              onChange={() => handleConsultTypeChange("clinic")}
              className="radio-custom mr-3"
            />
            <span className="text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality"
          className="font-semibold text-lg mb-3 text-gray-800"
        >
          Speciality
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace(/\//g, "-")}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span className="text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort"
          className="font-semibold text-lg mb-3 text-gray-800"
        >
          Sort By
        </h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              value="fees"
              checked={sortBy === "fees"}
              onChange={() => handleSortChange("fees")}
              className="radio-custom mr-3"
            />
            <span className="text-gray-700">Fees (Low to High)</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              value="experience"
              checked={sortBy === "experience"}
              onChange={() => handleSortChange("experience")}
              className="radio-custom mr-3"
            />
            <span className="text-gray-700">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
}; 