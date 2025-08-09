import React from "react";
import { Doctor } from "../services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      data-testid="doctor-card"
      className="card p-5 mb-4 flex items-start gap-5"
    >
      <div className="flex-shrink-0">
        <img
          src={doctor.photo || "/placeholder.svg"}
          alt={doctor.name}
          className="w-20 h-20 object-cover rounded-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
      </div>

      <div className="flex-grow">
        <h2 data-testid="doctor-name" className="text-xl font-bold text-blue-700 mb-1">
          Dr. {doctor.name}
        </h2>
        
        <div className="mb-2">
          <span data-testid="doctor-specialty" className="text-gray-600">
            {doctor.specialities && doctor.specialities.length > 0
              ? doctor.specialities.map(s => s.name).join(", ")
              : "General"}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          <span data-testid="doctor-experience" className="text-gray-700 mr-4">
            {doctor.experience} years exp
          </span>
          
          <span className="flex items-center text-amber-500">
            ⭐ N/A
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {doctor.video_consult && (
            <span className="tag tag-video">
              Video Consult
            </span>
          )}
          
          {doctor.in_clinic && (
            <span className="tag tag-clinic">
              In Clinic
            </span>
          )}
        </div>
        
        <div>
          <span data-testid="doctor-fee" className="text-xl font-bold text-green-600">
            ₹ {parseInt(doctor.fees.replace(/[^0-9]/g, ""), 10)}
          </span>
        </div>
      </div>
    </div>
  );
}; 