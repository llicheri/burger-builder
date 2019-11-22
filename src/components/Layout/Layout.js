import React, { Component } from "react";

import classes from "./Layout.module.css";
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    openedSidedrawer: false
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { openedSidedrawer: !prevState.openedSidedrawer };
    });
  };

  closeSideDrawerHandler = () => {
    this.setState({ openedSidedrawer: false });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar toggleSidedrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.openedSidedrawer}
          closed={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
