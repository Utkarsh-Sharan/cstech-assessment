import {Toaster} from "react-hot-toast";
import LoginSignupPage from "./pages/LoginSignupPage";

function App() {
  return (
    <>
      <section className="h-screen bg-brand-primary text-white">
        <LoginSignupPage />
      </section>

      <Toaster />
    </>
  );
}

export default App
