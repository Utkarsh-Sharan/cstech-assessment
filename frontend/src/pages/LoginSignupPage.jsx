import { useState } from "react";
import LoginForm from "../components/forms/LoginForm.jsx";
import SignupForm from "../components/forms/SignupForm.jsx";

const LoginSignupPage = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm((prev) => !prev);
  }

  return (
    <section className='h-full flex justify-center items-center'>
      {toggleForm ? 
      <SignupForm handleToggle={handleToggle} /> : 
      <LoginForm handleToggle={handleToggle} />}
    </section>
  )
}

export default LoginSignupPage