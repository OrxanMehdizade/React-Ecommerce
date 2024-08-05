// src/components/ColorTag.jsx
import React from 'react';

const ColorTag = ({ color }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '30px',
        height: '30px',
        backgroundColor: color,
        border: '1px solid #ccc',
        borderRadius: '10%',
        margin: '0 5px',
        cursor: 'pointer',
      }}
      title={color}
    />
  );
};

export default ColorTag;
