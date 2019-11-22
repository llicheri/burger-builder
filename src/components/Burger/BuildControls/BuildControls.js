import React from "react";
import PropTypes from "prop-types";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ing => {
        return (
          <BuildControl
            key={ing.label}
            label={ing.label}
            added={() => props.addIngredient(ing.type)}
            removed={() => props.removeIngredient(ing.type)}
            disabled={props.disabled[ing.type]}
          />
        );
      })}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.purchase}
      >
        ORDER NOW
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  price: PropTypes.number,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
  purchasable: PropTypes.bool,
  purchase: PropTypes.func
};

export default BuildControls;
