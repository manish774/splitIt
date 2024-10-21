import { Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "manish-quick-ui";
const Body = () => {
  const label = { inputProps: { "aria-label": "Switch Theme" } };
  const { theme, toggleTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme(newTheme);
  };

  return (
    <div>
      <Switch {...label} defaultChecked onClick={changeTheme} />
      <Outlet />
    </div>
  );
};

export default Body;
