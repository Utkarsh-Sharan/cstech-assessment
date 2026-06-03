import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";

export const useAgentStore = create((set, get) => ({
    agents: [],
    reRenderAgents: false,

    toggleRerenderAgents: () => {
        set({reRenderAgents: !get().reRenderAgents});
    },

    getAllAgents: async () => {
        try {
            const res = await axiosInstance.get("/auth/get-agents");

            set({agents: res.data.agents});
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