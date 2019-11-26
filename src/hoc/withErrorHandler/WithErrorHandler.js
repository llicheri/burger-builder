import React, { Component } from "react";

import Auxiliary from "../Auxiliary";
import Modal from "../../components/UI/modal/Modal";

const withErrorHandler = (Comp, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            closeModal={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Comp {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
