import { useState, useEffect, useRef } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import app from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const notify = (message) => toast(message);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    cost: "",
    stock: "",
    options: "",
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
      options: formData.options,
    })
      .then(() => {
        notify("Item Added Successfully");
        setFormData({
          category: "",
          name: "",
          price: "",
          cost: "",
          stock: "",
          options: "",
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
        notify("Item Updated Successfully");
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
      options: "",
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    if (formRef.current) {
      formRef.current.scrollTo({
        top: formRef.current.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-10">
      <div className="bg-gray-100 rounded-lg p-5 w-96 mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-center m-5">Add Menu Item</h1>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="p-2">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2">
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2">
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2 mb-5">
            <input
              type="text"
              name="options"
              value={formData.options}
              onChange={handleChange}
              placeholder="Options"
              className="bg-gray-50 border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="p-2 mt-5 mx-auto text-center rounded-2xl w-24 bg-green-400">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className="mt-10">
        <h2 className="text-xl font-bold">Menu Items</h2>
        <div className="grid grid-cols-1 gap-4 mt-5">
          {items.map((item) => (
            <div key={item.id} className="p-5 bg-white rounded-lg shadow-md">
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> {item.price}
              </p>
              <p>
                <strong>Cost:</strong> {item.cost}
              </p>
              <p>
                <strong>Stock:</strong> {item.stock}
              </p>
              <p>
                <strong>Options:</strong> {item.options}
              </p>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
