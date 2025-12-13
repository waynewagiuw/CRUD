import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TableListProducts from "../components/TableListProducts";
import ModalFormProducts from "../components/ModalFormProducts";
import { supabase } from "../supabaseClient";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    else setProducts(data);
  };

  const handleOpen = (mode, product = null) => {
    setModalMode(mode);
    setProductData(product);
    setIsOpen(true);
  };

  const handleSubmit = async (newData) => {
  if (modalMode === "add") {
    const { data, error } = await supabase
      .from("products")
      .insert([newData])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProducts((prev) => [...prev, data]);
  } else {
    const { id, ...updateData } = newData;

    const { data, error } = await supabase
      .from("products")
      .update(updateData)   
      .eq("id", id)     
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? data : p))
    );
  }

  setIsOpen(false);
};


  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await supabase.from("products").delete().eq("id", id);

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Navbar
        title="Products"
        onOpen={() => handleOpen("add")}
        onSearch={setSearchTerm}
      />

      <TableListProducts
        tableData={products}
        searchTerm={searchTerm}
        handleOpen={handleOpen}
        handleDelete={handleDelete}
      />
      <ModalFormProducts
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        productData={productData}
        onSubmit={handleSubmit}
      />
    </>
  );
}
