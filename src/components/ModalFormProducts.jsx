import { useState, useEffect } from "react";

export default function ModalFormProducts({
  isOpen,
  onClose,
  mode,
  onSubmit,
  productData,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("food");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("food");
    setStock(0);
    setImage("");
  };

  useEffect(() => {
    if (isOpen && mode === "edit" && productData) {
      setTitle(productData.title || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category || "food");
      setStock(productData.stock || 0);
      setImage(productData.image || "");
    } else if (!isOpen) {
      resetForm();
    }
  }, [isOpen, mode, productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image,
    };

    if (mode === "edit" && productData?.id) {
      await onSubmit({ ...payload, id: productData.id });
    } else {
      await onSubmit(payload);
    }

    resetForm();
    onClose();
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {mode === "edit" ? "Edit Product" : "Add Product"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input
              type="text"
              className="grow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Description
            <input
              type="text"
              className="grow"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Price
            <input
              type="number"
              className="grow"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <select
            className="select select-bordered mb-4 w-full max-w-xs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="elektronik">Elektronik</option>
          </select>

          <label className="input input-bordered flex items-center gap-2">
            Stock
            <input
              type="number"
              className="grow"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Image URL
            <input
              type="text"
              className="grow"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          <button type="submit" className="btn btn-success ">
            {mode === "edit" ? "Save Changes" : "Add Product"}
          </button>
        </form>
      </div>
    </dialog>
  );
}
