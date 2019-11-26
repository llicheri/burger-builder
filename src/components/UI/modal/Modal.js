import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.show !== nextProps.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.show}
          clicked={this.props.closeModal}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func
};

export default Modal;
