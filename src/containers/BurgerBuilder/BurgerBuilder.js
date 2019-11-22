import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
  bacon: 0.7,
  cheese: 0.5,
  salad: 0.3,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      salad: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePuschasableValue(ingredidents) {
    const sum = Object.keys(ingredidents)
      .map(ingKey => {
        return ingredidents[ingKey];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = ingName => {
    const newIndgredients = { ...this.state.ingredients };
    newIndgredients[ingName]++;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[ingName];
    this.setState({ ingredients: newIndgredients, totalPrice: newPrice });
    this.updatePuschasableValue(newIndgredients);
  };

  removeIngredientHandler = ingName => {
    if (this.state.ingredients[ingName] <= 0) {
      return;
    }
    const newIndgredients = { ...this.state.ingredients };
    newIndgredients[ingName]--;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[ingName];
    this.setState({ ingredients: newIndgredients, totalPrice: newPrice });
    this.updatePuschasableValue(newIndgredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseCancelHandler = () => {
    this.purchaseCloseHandler();
  };

  purchaseConfirmHandler = () => {
    alert("Purchase condifrmed");
  };

  render() {
    const disabled = {};
    for (const key in this.state.ingredients) {
      disabled[key] = this.state.ingredients[key] <= 0;
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCloseHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancelled={this.purchaseCancelHandler}
            confirmed={this.purchaseConfirmHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabled}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchase={this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
