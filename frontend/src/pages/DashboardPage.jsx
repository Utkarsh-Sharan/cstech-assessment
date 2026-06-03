import AgentCard from '../components/dashboard/agent/AgentCard.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';

const DashboardPage = () => {
  return (
    <section className='h-full w-11/12 md:max-w-3xl border border-brand-tertiary'>
      <DashboardHeader />

      <hr className='mt-4' />

      <AgentCard />
    </section>
  )
}

export default DashboardPage