export default function TableListProducts({
  tableData,
  searchTerm,
  handleOpen,
  handleDelete,
}) {
  const filtered = tableData.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra ">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                <img
                  src={p.image}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>${p.price}</td>

              <td className="flex gap-2 h-23 ">
                <button
                  className="btn btn-secondary self-center "
                  onClick={() => handleOpen("edit", p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-accent self-center"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
