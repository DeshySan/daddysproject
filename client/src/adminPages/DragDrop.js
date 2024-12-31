import React, { useState } from "react";

// Helper function to move item between two lists
const moveItem = (from, to, item) => {
  const fromIndex = from.indexOf(item);
  const toIndex = to.indexOf(item);

  // Remove from "from" list and add to "to" list
  if (fromIndex !== -1) {
    from.splice(fromIndex, 1);
  }
  to.push(item);
};

const DragDrop = () => {
  const [listA, setListA] = useState(["Item 1", "Item 2", "Item 3"]);
  const [listB, setListB] = useState(["Item 4", "Item 5", "Item 6"]);
  const [draggedItem, setDraggedItem] = useState(null);

  // Handle drag start
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow the drop
  };

  // Handle drop into List B
  const handleDropInB = () => {
    if (draggedItem && !listB.includes(draggedItem)) {
      const newListA = [...listA];
      const newListB = [...listB];
      moveItem(newListA, newListB, draggedItem);

      setListA(newListA);
      setListB(newListB);
    }
  };

  // Handle drop into List A
  const handleDropInA = () => {
    if (draggedItem && !listA.includes(draggedItem)) {
      const newListA = [...listA];
      const newListB = [...listB];
      moveItem(newListB, newListA, draggedItem);

      setListA(newListA);
      setListB(newListB);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
      }}>
      <div
        style={{ border: "1px solid black", width: "200px", padding: "10px" }}
        onDragOver={handleDragOver}
        onDrop={handleDropInA}>
        <h3>List A</h3>
        {listA.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(item)}
            style={{
              padding: "5px",
              border: "1px solid gray",
              margin: "5px",
              cursor: "move",
            }}>
            {item}
          </div>
        ))}
      </div>

      <div
        style={{ border: "1px solid black", width: "200px", padding: "10px" }}
        onDragOver={handleDragOver}
        onDrop={handleDropInB}>
        <h3>List B</h3>
        {listB.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(item)}
            style={{
              padding: "5px",
              border: "1px solid gray",
              margin: "5px",
              cursor: "move",
            }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDrop;
