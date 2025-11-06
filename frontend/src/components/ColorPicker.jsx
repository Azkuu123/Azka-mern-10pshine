import React, { useState } from "react";

const ColorPicker = ({ color, setColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#ffcc80",
    "#b39ddb",
    "#80cbc4",
    "#ffab91",
    "#ffe082",
    "#c5e1a5",
    "#b3e5fc",
    "#81d4fa",
    "#f48fb1",
    "#ce93d8",
  ];

  return (
    <div className="relative">
      {/* Color circle button */}
      <div
        className="w-6 h-6 rounded-full border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
        title="Pick note color"
      ></div>

      {/* Color palette */}
      {isOpen && (
        <div className="absolute left-12 top-0 bg-white shadow-lg border rounded-lg p-8 pr-10 pl-5 grid grid-cols-5 gap-7 z-20">
          {colors.map((clr, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full cursor-pointer border hover:scale-110 transition-transform"
              style={{ backgroundColor: clr }}
              onClick={() => {
                setColor(clr);
                setIsOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
