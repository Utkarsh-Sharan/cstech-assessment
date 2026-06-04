import {X} from "lucide-react";
import { useAgentStore } from "../../../store/agentStore.js";
import SignupForm from "../../forms/SignupForm.jsx";

const AgentCreationModal = () => {
  const {isAgentCreationModalOpen, setIsAgentCreationModalOpen} = useAgentStore();

  if(!isAgentCreationModalOpen) return;

  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md" 
        onClick={() => setIsAgentCreationModalOpen(false)}
      />

      <div className="relative p-6 w-11/12 md:max-w-lg">
        <button 
          className="absolute top-8 right-8 text-brand-tertiary"
          onClick={() => setIsAgentCreationModalOpen(false)}
        >
          <X />
        </button>

        <SignupForm isAgent />
      </div>
    </article>
  );
}

export default AgentCreationModal