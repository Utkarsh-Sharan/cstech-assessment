import { useAgentStore } from "../../store/agentStore.js"
import FileUpload from "./FileUpload.jsx";

const DashboardHeader = () => {
  const {setIsAgentCreationModalOpen, uploadFile} = useAgentStore();

  const handleFileUpload = (file) => {
    const formData = new FormData();

    formData.append("file", file);

    uploadFile(formData);
  }

  return (
    <article className="flex justify-between items-center mt-2">
        <div>
            <h1 className='text-3xl font-bold text-brand-tertiary'>Welcome to your dashboard</h1>
            <h3 className='text-lg font-semibold'>Manage your agents and tasks here</h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
            <button 
                className="bg-brand-tertiary rounded-md px-4 py-1"
                onClick={() => setIsAgentCreationModalOpen(true)}
            >
                Add agent
            </button>

            <FileUpload onFileSelect={handleFileUpload} />
        </div>
    </article>
  )
}

export default DashboardHeader