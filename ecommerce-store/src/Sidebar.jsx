import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onFilterChange, products }) => {
  const [tempFilters, setTempFilters] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const getUniqueValues = (category) => {
    return [...new Set(products.map((product) => product[category]))].filter(Boolean);
  };

  const handleCheckboxChange = (category, value) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(true)}>
        ☰ Filters
      </button>

      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)}></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="filters-container">
          {["color", "gender", "price", "type"].map((category) => (
            <div key={category} className="filter-group">
              <h4 className="filter-title">{category}</h4>
              <div>
                {getUniqueValues(category).map((item) => (
                  <label key={item} className="filter-label">
                    <input
                      type="checkbox"
                      checked={tempFilters[category].includes(item)}
                      onChange={() => handleCheckboxChange(category, item)}
                      className="filter-checkbox"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="filter-buttons">
            <button className="apply-btn" onClick={handleApplyFilters}>Apply</button>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;