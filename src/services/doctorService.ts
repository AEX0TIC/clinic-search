import { useQuery } from "@tanstack/react-query";

// Define the Doctor interface to match the API response
export interface Specialty {
  name: string;
}

export interface ClinicAddress {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

export interface Clinic {
  name: string;
  address: ClinicAddress;
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialities: Specialty[];
  experience: string;
  fees: string;
  video_consult: boolean;
  in_clinic: boolean;
  clinic: Clinic;
}

// Function to fetch doctors data from the API
const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    
    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }
    
    const data = await response.json();
    // The API returns an object with a 'data' property containing the doctors array
    return data.data || data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// Custom hook to use the query
export const useFetchDoctors = () => {
  return useQuery<Doctor[], Error>({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (previously called cacheTime)
  });
}; 