import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = c => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <div key={i} className="checkbox-value">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        style={{ zoom: "1.5" }}
      />
      <span>{c.name}</span>
    </div>
  ));
};

export default Checkbox;
