import { useState } from "react";
import { axiosInstance } from "../../utils/axios.js";
import { useAuthStore } from "../../store/authStore.js";

const SignupForm = ({handleToggle}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const {registerUser} = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async () => {
    registerUser(formData);
  }
    
  return (
    <article className='border border-brand-tertiary rounded-lg p-4 flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Signup</h2>

      <label htmlFor='fullName'>Full name</label>
        <input 
          type="text"
          name='fullName'
          placeholder='Enter full name'
          value={formData.fullName}
          onChange={handleChange}
          className='rounded-md p-2 bg-brand-secondary'
        />

      <label htmlFor='email'>Email</label>
        <input 
          type="text"
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
          className='rounded-md p-2 bg-brand-secondary'
        />

      <label htmlFor='phone'>Phone</label>
        <input 
            type="text"
            name='phone'
            placeholder='Enter phone number'
            value={formData.phone}
            onChange={handleChange}
            className='rounded-md p-2 bg-brand-secondary'
        />

      <label htmlFor='password'>Password</label>
        <input 
            type="password"
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            className='rounded-md p-2 bg-brand-secondary'
        />
      

      <button
        className='bg-brand-accent text-black rounded-md py-2'
        onClick={handleSubmit}
      >
        Signup
      </button>

      <p className="text-center">
        Already have an account? {" "} 
        <span 
          className='text-brand-accent underline cursor-pointer'
          onClick={handleToggle}
        >
          Login
        </span>
      </p>
    </article>
  )
}

export default SignupForm