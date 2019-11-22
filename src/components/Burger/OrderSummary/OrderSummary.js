import React from "react";
import PropTypes from "prop-types";

import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
    return (
      <li key={"list" + ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
        {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <strong>Total price: {props.price.toFixed(2)}</strong>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.confirmed} btnType="Success">
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  cancelled: PropTypes.func,
  confirmed: PropTypes.func,
  price: PropTypes.number
};

export default OrderSummary;
