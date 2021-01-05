import React from "react";
import styles from "./AppBar.module.css";
const AppBar = () => {
  return (
    <div className={`${styles.logo} card`}>
      <h2>Storytime</h2>
    </div>
  );
};

export default AppBar;
