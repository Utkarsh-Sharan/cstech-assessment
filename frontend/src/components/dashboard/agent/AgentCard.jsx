const AgentCard = ({data}) => {
  return (
    <article className="bg-brand-secondary border border-brand-tertiary rounded-lg
    flex flex-col items-start justify-center p-2">
      <h5 className="text-xl font-medium">{data.fullName}</h5>

      <p className="mt-2 text-lg">{data.email}</p>

      <p className="text-lg">{data.phone}</p>

      <button className="mt-4 bg-brand-accent rounded-md px-2">
        View Tasks
      </button>
    </article>
  )
}

export default AgentCard