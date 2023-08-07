import React, { useState } from "react";

export default function AddCard({ addCard }) {
  const [title, setTitle] = useState("");

  const containerStyle = {
    width: "60%",
    padding: "5px",
    display: "flex",
    alignItems: "center",
  };

  const textInputStyle = {
    flex: "4",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    flex: "1",
    margin: "0 3px",
    backgroundColor: "green",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={{ flex: "1", textAlign: "center" }}>Card Title</div>
      <input
        type="text"
        style={textInputStyle}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        style={buttonStyle}
        onClick={() => {
        addCard(title);
        setTitle("");
        }}
      >
        Add Card
      </button>
    </div>
  );
}