import { useEffect, useState } from 'react';
import { axiosInstance } from "../../utils/axios.js";
import { useAuthStore } from '../../store/authStore.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({handleToggle}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {authUser, loginUser} = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = () => {
    loginUser(formData);
  }

  useEffect(() => {
    if(authUser)
      navigate("/dashboard");
  }, [authUser]);

  return (
    <article className='border border-brand-tertiary rounded-lg p-4 flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Login</h2>

      <label htmlFor='email'>Email</label>
      <input 
        type="text"
        name='email'
        placeholder='Enter email'
        value={formData.email}
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
        Login
      </button>

      <p className='text-center'>
        Don't have an account? {" "} 
        <span 
          className='text-brand-accent underline cursor-pointer'
          onClick={handleToggle}
        >
          Signup
        </span>
      </p>
    </article>
  )
}

export default LoginForm