import {Toaster} from "react-hot-toast";
import {Routes, Route, Navigate} from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuthStore } from "./store/authStore.js";

function App() {
  const {authUser} = useAuthStore();

  return (
    <>
      <section className="h-screen bg-brand-primary text-white flex justify-center 
      items-center">
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />

          <Route path="/dashboard" element={authUser ? <DashboardPage /> : <Navigate to="/" />} />
        </Routes>
      </section>

      <Toaster />
    </>
  );
}

export default App
