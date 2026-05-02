import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import CalendarPage from "@/pages/CalendarPage";
import Analytics from "@/pages/Analytics";
import Subscription from "@/pages/Subscription";
import DoctorPortal from "@/pages/DoctorPortal";
import Settings from "@/pages/Settings";
import useAuthStore from "@/store/authStore";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "!font-body !text-sm !rounded-lg !shadow-card",
          style: { borderRadius: "12px", padding: "12px 16px" },
          success: { iconTheme: { primary: "#FF6F91", secondary: "#fff" } },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
          <Route path="/onboarding" element={<AnimatedPage><Onboarding /></AnimatedPage>} />
          <Route path="/dashboard" element={
            <ProtectedRoute><AnimatedPage><Dashboard /></AnimatedPage></ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute><AnimatedPage><CalendarPage /></AnimatedPage></ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute><AnimatedPage><Analytics /></AnimatedPage></ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute><AnimatedPage><Subscription /></AnimatedPage></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><AnimatedPage><Settings /></AnimatedPage></ProtectedRoute>
          } />
          <Route path="/doctor/view/:token" element={<AnimatedPage><DoctorPortal /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
