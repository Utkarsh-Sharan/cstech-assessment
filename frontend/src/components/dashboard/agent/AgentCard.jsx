const AgentCard = ({data}) => {
  return (
    <article className="bg-brand-secondary border border-brand-tertiary rounded-lg
    flex flex-col items-center justify-center p-2">
        <h5>name</h5>

        <p>email</p>

        <p>phone</p>

        <button className="bg-brand-accent rounded-md px-2">
            View Tasks
        </button>
    </article>
  )
}

export default AgentCard