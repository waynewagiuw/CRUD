import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Error adding client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClient(req.params.id, req.body);

    if (!updatedClient) return res.status(404).json({ message: "Client not found" });

    res.status(200).json(updatedClient);
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deleted = await clientService.deleteClient(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClients = async (req, res) => {
  try {
    const clients = await clientService.searchClients(req.query.q || "");
    res.status(200).json(clients);
  } catch (err) {
    console.error("Error searching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
