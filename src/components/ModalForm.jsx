import { useEffect, useState } from "react";

export default function ModalForm({ isOpen, onClose, mode, OnSubmit, clientData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setJob("");
    setStatus(false);
  };

  useEffect(() => {
    if (isOpen && mode === "edit" && clientData) {
      setName(clientData.name || "");
      setEmail(clientData.email || "");
      setJob(clientData.job || "");
      setStatus(Boolean(clientData.isactive));
    } else if (!isOpen) {
      resetForm();
    } else if (mode === "add") {
      resetForm();
    }
  }, [isOpen, mode, clientData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        job: job.trim(),
        isactive: status,
      };

      await OnSubmit(payload);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error adding/updating client", err);
      alert("Failed to save client. Check console for details.");
    }
  };

  const handleCloseClick = () => {
    resetForm();
    onClose();
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === "edit" ? "Edit Client" : "Add Client"}
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="input input-bordered my-4 flex items-center gap-2">
            Name
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered my-4 flex items-center gap-2">
            Email
            <input
              type="email"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered my-4 flex items-center gap-2">
            Job
            <input
              type="text"
              className="grow"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </label>

          <div className="flex mb-4 justify-between">
            <select
              className="select select-bordered w-full max-w-xs"
              value={status ? "Active" : "Inactive"}
              onChange={handleStatusChange}
            >
              <option>Inactive</option>
              <option>Active</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseClick}
          >
            ✕
          </button>

          <button type="submit" className="btn btn-success">
            {mode === "edit" ? "Save Changes" : "Add Client"}
          </button>
        </form>
      </div>
    </dialog>
  );
}
