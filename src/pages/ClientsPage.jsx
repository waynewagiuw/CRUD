import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TableList from "../components/TableList";
import ModalForm from "../components/ModalForm";
import { supabase } from "../supabaseClient";

export default function ClientsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients_tb")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch clients error:", error);
      return;
    }

    setTableData(data || []);
  };

  const handleOpen = (mode, client = null) => {
    setIsOpen(true);
    setModalMode(mode);
    setClientData(client);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      const { data } = await supabase
        .from("clients_tb")
        .insert([newClientData])
        .select()
        .single();

      setTableData((prev) => [...prev, data]);
    } else {
      const { data } = await supabase
        .from("clients_tb")
        .update(newClientData)
        .eq("id", clientData.id)
        .select()
        .single();

      setTableData((prev) =>
        prev.map((c) => (c.id === clientData.id ? data : c))
      );
    }

    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this client?")) return;

    await supabase.from("clients_tb").delete().eq("id", id);

    setTableData((prev) => prev.filter((c) => c.id !== id));
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
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}
