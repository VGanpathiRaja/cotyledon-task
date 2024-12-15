import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", age: "", mobileno: "", city: "" });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5050/items`);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`http://localhost:5050/items`, newItem);
      setNewItem({ name: "", age: "", mobileno: "", city: "" });
      fetchItems();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5050/items/${id}`, editingItem);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h3>CRUD Operations</h3>

      <div className="inputs">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newItem.age}
          onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={newItem.mobileno}
          onChange={(e) => setNewItem({ ...newItem, mobileno: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newItem.city}
          onChange={(e) => setNewItem({ ...newItem, city: e.target.value })}
        />
        <button onClick={handleCreate} className="btn-green">Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {/* <tr>
              <td>1</td>
              <td>vgr</td>
              <td>26</td>
              <td>7502132895</td>
              <td>palani</td>
              <td><button className="btn-green">edit</button></td>
              <td><button className="btn-red">delete</button></td>
          </tr> */}
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItem?.id === item.id ? (
                  <input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>{editingItem?.id === item.id ? (
                  <input
                    value={editingItem.age}
                    onChange={(e) => setEditingItem({ ...editingItem, age: e.target.value })}
                  />
                ) : (
                  item.age
                )}
              </td>
              <td>{editingItem?.id === item.id ? (
                  <input
                    value={editingItem.mobileno}
                    onChange={(e) => setEditingItem({ ...editingItem, mobileno: e.target.value })}
                  />
                ) : (
                  item.mobileno
                )}
              </td>
              <td>{editingItem?.id === item.id ? (
                  <input
                    value={editingItem.city}
                    onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })}
                  />
                ) : (
                  item.city
                )}
              </td>
              <td>
                {editingItem?.id === item.id ? (
                  <button onClick={() => handleUpdate(item.id)} className="btn-green">Save</button>
                ) : (
                  <button onClick={() => setEditingItem(item)} className="btn-green">Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="btn-red">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <table>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.mobileno}</td>
              <td>{item.city}</td>
              <td>
                {editingItem?.id === item.id ? (
                  <button onClick={() => handleUpdate(item.id)} className="btn-green">Save</button>
                ) : (
                  <button onClick={() => setEditingItem(item)} className="btn-green">Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="btn-red">Delete</button>
              </td>
          ))}
      </table> */}
    </div>
  );
}

export default App;
