import React from "react";
import PropTypes from "prop-types";

import classes from "./DrawerToggle.module.css";

const DrawerToggle = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.toggleSidedrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

DrawerToggle.propTypes = {
  toggleSidedrawer: PropTypes.func
};

export default DrawerToggle;
