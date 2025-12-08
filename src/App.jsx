// src/App.jsx
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";

// 1. Set your Supabase project URL and anon key
const supabaseUrl = "https://ueoqhrqjqkophmfbrqmo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3FocnFqcWtvcGhtZmJycW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzEwOTIsImV4cCI6MjA3OTYwNzA5Mn0.UAaluUZh89GpUGaFgTSGXYl16qOTvcmCz7C3pUyRkOY";

// 2. Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch all clients
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients_tb")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching clients:", error);
      return;
    }
    setTableData(data);
  };

  // Open modal
  const handleOpen = (mode, client = null) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };

  // Submit form for add or update
  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      const { data, error } = await supabase
        .from("clients_tb")
        .insert([newClientData])
        .select()
        .single();

      if (error) {
        console.error("Add client failed:", error);
        alert("Failed to add client");
        return;
      }

      setTableData((prev) => [...prev, data]);
    } else {
      const { data, error } = await supabase
        .from("clients_tb")
        .update(newClientData)
        .eq("id", clientData.id)
        .select()
        .single();

      if (error) {
        console.error("Update client failed:", error);
        alert("Failed to update client");
        return;
      }

      setTableData((prev) =>
        prev.map((c) => (c.id === clientData.id ? data : c))
      );
    }

    setIsOpen(false);
    setClientData(null);
  };

  // Delete client
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("clients_tb").delete().eq("id", id);

    if (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete client");
      return;
    }

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
