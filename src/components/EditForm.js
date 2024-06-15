import { useState } from "react";

export default function EditForm({ item, saveEditedItem, cancelEdit }) {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedItem(editedItem);
  };

  return (
    <div className="flex bg-gray-100 justify-between rounded-xl p-5">
      <form className="flex flex-col">
        <div className="pt-2 pb-1">
          <input
            type="text"
            name="category"
            value={editedItem.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-48 rounded-lg p-2"
          />
        </div>
        <div className="py-1">
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-48 rounded-lg p-2"
          />
        </div>
        <div className="py-1">
          <input
            type="number"
            name="price"
            value={editedItem.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-48 rounded-lg p-2"
          />
        </div>
        <div className="py-1">
          <input
            type="number"
            name="cost"
            value={editedItem.cost}
            onChange={handleChange}
            placeholder="Cost"
            className="w-48 rounded-lg p-2"
          />
        </div>
        <div className="py-1">
          <input
            type="number"
            name="stock"
            value={editedItem.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-48 rounded-lg p-2"
          />
        </div>
        <div className="pt-1 pb-2">
          <input
            type="text"
            name="options"
            value={editedItem.options}
            onChange={handleChange}
            placeholder="Options"
            className="w-48 rounded-lg p-2"
          />
        </div>
      </form>
      <div className="flex mt-2">
        <div className="ml-auto flex flex-col justify-start space-y-2">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-xl w-20"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-xl w-20"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
