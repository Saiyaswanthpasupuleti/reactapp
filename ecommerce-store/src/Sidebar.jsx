import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onFilterChange, products }) => {
  const [tempFilters, setTempFilters] = useState({ color: [], gender: [], price: [], type: [] });

  const getUniqueValues = (category) => {
    return [...new Set(products.map((product) => product[category]))].filter(Boolean);
  };

  const handleCheckboxChange = (category, value) => {
    const updatedFilters = {
      ...tempFilters,
      [category]: tempFilters[category].includes(value)
        ? tempFilters[category].filter((item) => item !== value)
        : [...tempFilters[category], value],
    };

    setTempFilters(updatedFilters);
    onFilterChange(updatedFilters); // Directly apply filter changes
  };

  return (
    <div className="sidebar-fixed">
      <h3>Filters</h3>
      {["color", "gender", "price", "type"].map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {getUniqueValues(category).map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={tempFilters[category].includes(value)}
                onChange={() => handleCheckboxChange(category, value)}
              />
              {value}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
