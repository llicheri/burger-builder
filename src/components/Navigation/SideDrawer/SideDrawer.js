import React from "react";
import PropTypes from "prop-types";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../../UI/backdrop/Backdrop";

const SideDrawer = props => {
  let sidedrawerClasses = [classes.SideDrawer, classes.Open];
  if (!props.open) {
    sidedrawerClasses = [classes.SideDrawer, classes.Close];
  }
  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sidedrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func
};

export default SideDrawer;
