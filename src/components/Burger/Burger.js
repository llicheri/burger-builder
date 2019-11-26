import React from "react";
import PropTypes from "prop-types";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  let ingredients = Object.keys(props.ingredients)
    .map(ingrKey => {
      return [...Array(props.ingredients[ingrKey])].map((_, index) => {
        return <BurgerIngredient key={ingrKey + index} type={ingrKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (ingredients.length === 0) {
    ingredients = <p>Insert some ingredidents to start!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {ingredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object
};

export default Burger;
