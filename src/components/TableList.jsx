export default function TableList({ tableData, handleOpen, handleDelete, searchTerm }) {
  const filteredData = tableData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>
                  <button className={`btn rounded-full w-20 ${client.isactive ? "btn-primary" : "btn-outline btn-primary"}`}>
                    {client.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-secondary" onClick={() => handleOpen("edit", client)}>Edit</button>
                  <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
