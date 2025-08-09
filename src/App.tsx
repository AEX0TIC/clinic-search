import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorListingPage from "./components/DoctorListingPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<DoctorListingPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
