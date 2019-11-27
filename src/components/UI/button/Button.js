import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

const Button = props => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
  btnType: PropTypes.oneOf(["Success", "Danger"])
};

export default Button;
