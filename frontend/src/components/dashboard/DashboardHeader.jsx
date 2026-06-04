import { useAgentStore } from "../../store/agentStore.js"

const DashboardHeader = () => {
  const {setIsAgentCreationModalOpen} = useAgentStore();

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

            <button className="bg-brand-accent rounded-md text-black px-4 py-1">
                Upload file
            </button>
        </div>
    </article>
  )
}

export default DashboardHeader