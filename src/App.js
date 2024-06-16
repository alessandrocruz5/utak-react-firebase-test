import { useState, useEffect, useRef } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import app from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = (message) => toast(message);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    cost: "",
    stock: "",
    size: "",
  });
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const itemsRef = ref(db, "menu/items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setItems(itemList);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateData();
    } else {
      saveData();
    }
  };

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "menu/items"));

    set(newDocRef, {
      category: formData.category,
      name: formData.name,
      price: formData.price,
      cost: formData.cost,
      stock: formData.stock,
      size: formData.size,
    })
      .then(() => {
        notify("Item Added Successfully!");
        setFormData({
          category: "",
          name: "",
          price: "",
          cost: "",
          stock: "",
          size: "",
        });
      })
      .catch((err) => {
        notify("Error: " + err.message);
      });
  };

  const updateData = async () => {
    const db = getDatabase(app);
    const itemRef = ref(db, `menu/items/${editId}`);

    update(itemRef, formData)
      .then(() => {
        notify("Item Updated Successfully!");
        resetForm();
      })
      .catch((err) => {
        notify("Error: " + err.message);
      });
  };

  const resetForm = () => {
    setFormData({
      category: "",
      name: "",
      price: "",
      cost: "",
      stock: "",
      size: "",
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const deleteItem = async (itemId) => {
    const db = getDatabase(app);
    const itemRef = ref(db, `menu/items/${itemId}`);

    remove(itemRef)
      .then(() => {
        notify("Item Deleted Successfully!");
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      })
      .catch((err) => {
        notify("Error: " + err.message);
      });
  };

  return (
    <div ref={formRef} className="bg-gray-800">
      <div className="p-10">
        <div className="bg-gray-700 rounded-lg p-5 w-96 mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-center m-5 text-white">
              Add Menu Item
            </h1>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="p-2">
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="bg-gray-500 text-white placeholder-white border-gray-600 rounded-lg p-3 w-full"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="bg-gray-500 text-white placeholder-white border-gray-600 rounded-lg p-3 w-full"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (in PHP)"
                className="bg-gray-500 text-white placeholder-white border-gray-600 rounded-lg p-3 w-full"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="Cost (in PHP)"
                className="bg-gray-500 text-white placeholder-white border-gray-600 rounded-lg p-3 w-full"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="bg-gray-500 text-white placeholder-white border-gray-600 rounded-lg p-3 w-full"
                required
              />
            </div>
            <div className="p-2 mb-5">
              <div className="mb-5">
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="bg-gray-500 text-white border-gray-300 rounded-lg p-3 w-full"
                  required
                >
                  <option value="">Size</option>
                  <option value="N/A">N/A</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                  <option value="Single">Single</option>
                  <option value="Sharing">Sharing</option>
                  <option value="One scoop">One scoop</option>
                  <option value="Two scoops">Two scoops</option>
                </select>
              </div>
            </div>
            <div className="p-2 mt-5 mx-auto text-center space-x-10">
              <button
                className="rounded-2xl w-24 bg-green-400 p-2"
                type="submit"
              >
                {editId ? "Update" : "Submit"}
              </button>
              {editId && (
                <button
                  className="bg-red-500 rounded-2xl w-24 p-2"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <ToastContainer toastStyle={{ background: "#4b5563", color: "#fff" }} />
        <div className="m-10 p-10 bg-gray-700 w-5/6 mx-auto">
          <h2 className="text-xl font-bold text-white">Menu Items</h2>
          <div className="grid grid-cols-3 gap-4 mt-5 w-full ">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-gray-600 rounded-lg shadow-md flex justify-between"
              >
                <div className="text-white">
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ₱{item.price}
                  </p>
                  <p>
                    <strong>Cost:</strong> ₱{item.cost}
                  </p>
                  <p>
                    <strong>Stock:</strong> {item.stock}
                  </p>
                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>
                </div>
                <div className="flex flex-col">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="p-5">
                <p className="text-white">You have no items added.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
