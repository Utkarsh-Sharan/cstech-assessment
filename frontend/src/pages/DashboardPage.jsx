import AgentCreationModal from '../components/dashboard/agent/AgentCreationModal.jsx';
import AgentList from '../components/dashboard/agent/AgentList.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';

const DashboardPage = () => {
  return (
    <section className='h-full w-11/12 md:max-w-3xl'>
      <DashboardHeader />

      <hr className='mt-4' />

      <AgentList />

      <AgentCreationModal />
    </section>
  )
}

export default DashboardPage