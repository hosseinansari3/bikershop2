import React, { useState } from "react";
import MenuItems from "./MenuItems";

const DropDown = ({ submenus, dropdown, depthLevel, isBurgur }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul
      style={isBurgur && { position: "relative" }}
      className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}
    >
      {" "}
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}{" "}
    </ul>
  );
};

export default DropDown;
