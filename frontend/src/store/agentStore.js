import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";

export const useAgentStore = create((set, get) => ({
    agents: [],
    tasks: [],
    agentId: "",
    reRenderAgents: false,
    isAgentCreationModalOpen: false,
    isTasksModalOpen: false,

    toggleRerenderAgents: () => {
        set({reRenderAgents: !get().reRenderAgents});
    },

    setIsAgentCreationModalOpen: (value) => {
        set({isAgentCreationModalOpen: value});
    },

    setIsTasksModalOpen: (value, id) => {
        set({isTasksModalOpen: value});
        set({agentId: id});
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

    createAgent: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/register", data);

            set((state) => ({agents: [...state.agents, res.data.user]}));
            toggleRerenderAgents();

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

    uploadFile: async (data) => {
        try {
            const res = await axiosInstance.post(
                "/auth/upload-file", 
                data, 
                {headers: {"Content-Type": "multipart/form-data"}});
            
                console.log(res);
            set({tasks: res.data.items});

            toast.success(res.data.message);
        } catch (error) {
            const backend = error.response?.data;
            const message = 
                (backend?.errors && Object.values(backend.errors)[0]) ||
                backend?.message ||
                "Something went wrong!";
            
            toast.error(message);
        }
    }
}));