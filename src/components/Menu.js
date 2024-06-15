import { getDatabase, ref, get, remove, set } from "firebase/database";
import app from "../firebaseConfig";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "menu/items");
        const snapshot = await get(dbRef);
        if (snapshot.exists) {
          const readData = snapshot.val();
          const tempArr = Object.keys(readData).map((key) => {
            return {
              ...readData[key],
              id: key,
            };
          });
          setMenuData(tempArr);
        } else {
          setMenuData([]);
        }
      } catch (err) {
        console.error("Error: ", err.message);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/items/" + id);
    await remove(dbRef);
    setMenuData(menuData.filter((item) => item.id !== id));
    // window.location.reload();
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const cancelEdit = (item) => {
    setEditItem(null);
  };

  const saveEditItem = async (item) => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "menu/items/" + item.id);
    set(newDocRef, {
      category: item.category,
      name: item.name,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
      options: item.options,
    })
      .then(() => {
        alert("Data saved successfully.");
        setMenuData(
          menuData.map((menuItem) =>
            menuItem.id === item.id ? item : menuItem
          )
        );
        setEditItem(null);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl m-5 text-center font-bold">Menu</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuData.map((item, index) => {
          return (
            <div key={index}>
              {editItem === item ? (
                <EditForm
                  item={editItem}
                  saveEditedItem={saveEditItem}
                  cancelEdit={cancelEdit}
                />
              ) : (
                <div className="flex  bg-gray-100 rounded-xl p-5">
                  <div className="flex flex-col flex-grow">
                    <p className="my-3">
                      <strong>Category: </strong>
                      {item.category}
                    </p>
                    <p className="my-3">
                      <strong>Name: </strong>
                      {item.name}
                    </p>
                    <p className="my-3">
                      <strong>Price: </strong>
                      {item.price}
                    </p>
                    <p className="my-3">
                      <strong>Cost: </strong>
                      {item.cost}
                    </p>
                    <p className="my-3">
                      <strong>Stock: </strong>
                      {item.stock}
                    </p>
                    <p className="my-3">
                      <strong>Options: </strong>
                      {item.options}
                    </p>
                    {/* <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button> */}
                  </div>
                  <div className="flex">
                    <div className="ml-auto flex flex-col justify-start space-y-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {menuData.length === 0 && <p>No menu items found.</p>}
    </div>
  );
}
