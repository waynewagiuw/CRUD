import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TableList from "./components/Tablelist";
import ModalForm from "./components/ModalForm";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await axios.get("http://localhost:3000/api/clients");
    setTableData(res.data);
  };

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      const { data } = await axios.post(
        "http://localhost:3000/api/clients",
        newClientData
      );
      setTableData((prev) => [...prev, data]);
    } else {
      const { data } = await axios.put(
        `http://localhost:3000/api/clients/${clientData.id}`,
        newClientData
      );
      setTableData((prev) =>
        prev.map((c) => (c.id === clientData.id ? data : c))
      );
    }
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/clients/${id}`);
      setTableData((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete client. Check backend server.");
    }
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />

      <TableList
        tableData={tableData}
        searchTerm={searchTerm}
        handleOpen={handleOpen}
        handleDelete={handleDelete}
      />

      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => {
          setIsOpen(false);
          setClientData(null);
        }}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
