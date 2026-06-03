import { useEffect } from "react";
import { useAgentStore } from "../../../store/agentStore.js";
import AgentCard from "./AgentCard";

const AgentList = () => {
  const {agents, reRenderAgents, getAllAgents} = useAgentStore();

  useEffect(() => {
    getAllAgents();
  }, [reRenderAgents]);

  return (
    agents.length > 0 ?
    <section
        className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'
    >
        {agents.map((agent) => (
            <AgentCard key={agent._id} data={agent} />
        ))}
    </section> :
    <h4 className="text-xl font-semibold text-center mt-2">No agents created yet...</h4>
  )
}

export default AgentList