import { useState } from "react";
import Logo from "./logo";
import Form from "./Form";
import { PackingList } from "./PackingList";

export default function App() {
  const [items, setItems] = useState([]);

  const packedItems = items.filter((item) => item.packed).length;
  function handleAdditem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearlist() {
    const confirmation = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmation) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdditem={handleAdditem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearlist={handleClearlist}
      />
      <Stats items={items} />
    </div>
  );
}

export function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list!</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "🎉You got everything! Ready to go 🎉"
          : `you have ${numItems} items on your list , and you already packed 
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
