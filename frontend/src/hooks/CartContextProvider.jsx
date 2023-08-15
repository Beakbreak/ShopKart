import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultItemList = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add-item":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      } else {
        return {
          items: state.items.concat(action.item),
          totalAmount: updatedTotalAmount,
        };
      }

    case "remove-item":
      const existingCartItemIndexToRemove = state.items.findIndex(
        (item) => item.id === action.id
      );
      const itemToRemove = state.items[existingCartItemIndexToRemove];
      const updatedTotalAmountAfterRemove =
        state.totalAmount - itemToRemove.price;

      let updatedItemsAfterRemove;
      if (itemToRemove.amount === 1) {
        updatedItemsAfterRemove = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        updatedItemsAfterRemove = [...state.items];
        updatedItemsAfterRemove[existingCartItemIndexToRemove] = updatedItem;
      }

      return {
        items: updatedItemsAfterRemove,
        totalAmount: updatedTotalAmountAfterRemove,
      };

    case "clear-cart":
      return {
        ...defaultItemList,
      };

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultItemList);

  const addItemHandler = (item) => {
    dispatch({ type: "add-item", item });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "remove-item", id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "clear-cart" });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
