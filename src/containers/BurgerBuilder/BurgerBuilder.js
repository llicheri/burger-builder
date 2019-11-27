import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

const INGREDIENT_PRICE = {
  bacon: 0.7,
  cheese: 0.5,
  salad: 0.3,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-backend-322cf.firebaseio.com/ingredients.json")
      .then(resp => {
        this.setState({ ingredients: resp.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + this.state.ingredients[i]);
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabled = {};
    for (const key in this.state.ingredients) {
      disabled[key] = this.state.ingredients[key] <= 0;
    }
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orders = null;
    if (this.state.ingredients) {
      orders = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          cancelled={this.purchaseCancelHandler}
          confirmed={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Auxiliary>
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
    if (this.state.loading) {
      orders = <Spinner />;
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCloseHandler}
        >
          {orders}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
