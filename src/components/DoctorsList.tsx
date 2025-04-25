import React, { useMemo } from "react";
import { Doctor } from "../services/doctorService";
import { DoctorCard } from "./DoctorCard";
import { useFilterParams } from "../utils/urlUtils";

interface DoctorsListProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;
}

export const DoctorsList: React.FC<DoctorsListProps> = ({
  doctors,
  isLoading,
  error,
}) => {
  const { getParam, getArrayParam } = useFilterParams();
  
  const searchTerm = getParam("search");
  const consultType = getParam("consultType");
  const specialties = getArrayParam("specialties");
  const sortBy = getParam("sortBy");

  const filteredDoctors = useMemo(() => {
    if (isLoading || error || !doctors) return [];

    return doctors
      .filter((doctor) => {
        // Filter by search term
        if (searchTerm) {
          if (!doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
        }

        // Filter by consult type
        if (consultType === "video" && !doctor.video_consult) {
          return false;
        }
        if (consultType === "clinic" && !doctor.in_clinic) {
          return false;
        }

        // Filter by specialties
        if (specialties.length > 0) {
          const doctorSpecialties = doctor.specialities?.map(s => s.name) || [];
          
          const hasSpecialty = specialties.some((s) =>
            doctorSpecialties.includes(s)
          );
          if (!hasSpecialty) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        if (sortBy === "fees") {
          // Convert string fees to numbers for comparison
          const feeA = parseFloat(a.fees.replace(/[^0-9.]/g, "") || "0");
          const feeB = parseFloat(b.fees.replace(/[^0-9.]/g, "") || "0");
          return feeA - feeB;
        }
        if (sortBy === "experience") {
          const expA = parseInt(a.experience || "0", 10);
          const expB = parseInt(b.experience || "0", 10);
          return expB - expA;
        }
        return 0;
      });
  }, [doctors, searchTerm, consultType, specialties, sortBy, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60 bg-white rounded-lg p-8 border border-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p>Error loading doctors: {error.message}</p>
      </div>
    );
  }

  if (filteredDoctors.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        <p>No doctors found. Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredDoctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}; 