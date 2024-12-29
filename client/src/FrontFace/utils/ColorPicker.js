import React, { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff"); // Default color is white
  const [colorHistory, setColorHistory] = useState([]);

  // Convert Hex to RGB format
  const hexToRgb = (hex) => {
    // Remove the "#" if it's there
    hex = hex.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Handle color change
  const handleColorChange = (e) => {
    const selectedColor = e.target.value;

    // Update the selected color
    setColor(selectedColor);

    // Add the selected color to history if it's not already present
    if (!colorHistory.includes(selectedColor)) {
      setColorHistory([selectedColor, ...colorHistory].slice(0, 5)); // Keep max 5 colors in history
    }
  };
  return (
    <div>
      {/* Color Picker (using native HTML input type="color") */}
      <input
        type='color'
        value={color}
        onChange={handleColorChange}
        style={{
          width: "100px",
          height: "40px",
          border: "none",
          cursor: "pointer",
        }}
      />

      {/* Display the selected color's hex code */}
      <div style={{ marginTop: "20px", fontSize: "20px" }}>
        <p>Hex Code: {color}</p>

        {/* Display the RGB color */}
        <p>RGB: {hexToRgb(color)}</p>
      </div>

      {/* Display the selected color as a background */}
      <div
        style={{
          marginTop: "20px",
          width: "100px",
          height: "100px",
          backgroundColor: color,
          margin: "0 auto",
          borderRadius: "8px",
        }}></div>

      {/* Display Color History */}
      <div style={{ marginTop: "30px" }}>
        <h3>Color History</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}>
          {colorHistory.map((historyColor, index) => (
            <div
              key={index}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: historyColor,
                borderRadius: "4px",
                cursor: "pointer",
                border: historyColor === color ? "2px solid black" : "none",
              }}
              onClick={() => setColor(historyColor)} // Click to select a color from history
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
