import React, { useState } from "react";
import "./rolenames.scss";

const RoleNames = () => {
  const roles = [
    "მაფიოზი",
    "დონი",
    "ექიმი",
    "დეტექტივი",
    "ქილერი",
    "ქურდი",
    "ლამაზმანი",
    "მთვარეული",
    "მღვდელი",
    "მღვდელი",
    "მღვდელი",
    "მღვდელი",
    "მღვდელი",
    "მღვდელი",
    "მოსამართლე"
  ];

  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRoleSelection = (index) => {
    const updatedRoles = [...selectedRoles];
    if (updatedRoles.includes(index)) {
      updatedRoles.splice(updatedRoles.indexOf(index), 1);
    } else {
      updatedRoles.push(index);
    }
    setSelectedRoles(updatedRoles);
  };

  return (
    <div className="role_container">
      {roles.map((role, index) => (
        <div className="role_buttons" key={index}>
          <button
            onClick={() => {
              toggleRoleSelection(index);
            }}
          >
            <p>{role}</p>
          </button>
          <input
            type="checkbox"
            checked={selectedRoles.includes(index)}
            onChange={() => toggleRoleSelection(index)}
          />
        </div>
      ))}
     
    </div>
  );
};

export default RoleNames;
