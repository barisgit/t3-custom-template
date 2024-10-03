import React from "react";

const SettingsDropdown: React.FC = () => {
  return (
    <div className="dropdown">
      <button className="btn">Settings</button>
      <div className="dropdown-content">
        <a href="#">Profile</a>
        <a href="#">Account</a>
        <a href="#">Logout</a>
      </div>
    </div>
  );
};

export default SettingsDropdown;
