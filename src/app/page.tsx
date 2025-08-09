"use client";

import DoctorListingPage from "@/components/DoctorListingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DoctorListingPage />
    </QueryClientProvider>
  );
}
