import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";

export const useAuthStore = create((set, get) => ({
    authUser: null,

    registerUser: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/register", data);

            set({authUser: res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            const backend = error.response?.data;
            const message = 
                (backend?.errors && Object.values(backend.errors)[0]) ||
                backend?.message ||
                "Something went wrong!";
            
            toast.error(message);
        }
    },

    loginUser: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
    
            set({authUser: res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            const backend = error.response?.data;
            const message = 
                (backend?.errors && Object.values(backend.errors)[0]) ||
                backend?.message ||
                "Something went wrong!";
            
            toast.error(message);
        }
    },
}));