import { X } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore.js';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios.js';
import toast from 'react-hot-toast';

const TaskModal = () => {
    const [tasks, setTasks] = useState([]);
    const {agentId, isTasksModalOpen, setIsTasksModalOpen} = useAgentStore();

    useEffect(() => {
        const onLoadHandler = async () => {
            try {
                const res = await axiosInstance.get(`/auth/get-tasks/${agentId}`);
                
                setTasks(res.data.tasks);
            } catch (error) {
                const backend = error.response?.data;
                const message = 
                    (backend?.errors && Object.values(backend.errors)[0]) ||
                    backend?.message ||
                    "Something went wrong!";
                
                toast.error(message);
            }
        }

        if(agentId) onLoadHandler();
    }, [agentId]);
    
    if(!isTasksModalOpen) return;

    return (
        <article className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"
                onClick={() => setIsTasksModalOpen(false, "")}
            />

            <div className="relative p-6 w-11/12 md:max-w-lg">
                <button
                    className="absolute top-8 right-8 text-brand-tertiary"
                    onClick={() => setIsTasksModalOpen(false, "")}
                >
                    <X />
                </button>

                {tasks.length > 0 ?
                tasks.map((task, ind) => (
                    <>
                        <p className='text-lg font-bold text-brand-accent'>Task-{ind + 1}</p>
                        <p>Name: {task.firstName}</p>
                        <p>Phone: {task.phone}</p>
                        <p className='pb-4'>Notes: {task.notes}</p>
                    </>
                )) :
                <p>No tasks assigned to this agent.</p>}
            </div>
        </article>
    )
}

export default TaskModal