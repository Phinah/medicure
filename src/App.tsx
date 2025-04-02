
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";
import BookAppointment from "./pages/BookAppointment";
import HealthSurvey from "./pages/HealthSurvey";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected routes */}
                <Route path="/patient" element={
                  <ProtectedRoute roles={["patient"]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/doctor" element={
                  <ProtectedRoute roles={["doctor"]}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/hospital" element={
                  <ProtectedRoute roles={["hospital"]}>
                    <HospitalDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/caretaker" element={
                  <ProtectedRoute roles={["caretaker"]}>
                    <CaretakerDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/book-appointment" element={
                  <ProtectedRoute roles={["patient"]}>
                    <BookAppointment />
                  </ProtectedRoute>
                } />
                
                <Route path="/surveys/new" element={
                  <ProtectedRoute roles={["patient"]}>
                    <HealthSurvey />
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
