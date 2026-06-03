import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";

export const useAuthStore = create((set, get) => ({
    authUser: null,

    registerUser: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/register", formData);

            set({authUser: res.data.user});
            toast.success(res.message);
        } catch (error) {
            console.error("Failed to register", error);
        }
    },

    loginUser: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
    
            set({authUser: res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            console.error("Failed to login", error);
        }
    },
}));