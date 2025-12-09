export default function Navbar({ onOpen, onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm p-4 flex gap-3 md:flex-row md:justify-between">
      <div className="flex justify-between w-full md:w-auto">
        <a className="btn btn-ghost text-xl">Clients</a>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex justify-end w-full md:w-auto">
        <button className="btn btn-primary" onClick={onOpen}>
          Add Client
        </button>
      </div>
    </div>
  );
}
