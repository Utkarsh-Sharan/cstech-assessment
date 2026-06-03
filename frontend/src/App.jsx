import {Toaster} from "react-hot-toast";
import LoginSignupPage from "./pages/LoginSignupPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <section className="h-screen bg-brand-primary text-white flex justify-center 
      items-center">
        {/* <LoginSignupPage /> */}
        <DashboardPage />
      </section>

      <Toaster />
    </>
  );
}

export default App
