import { cartActions } from "./CartSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${BACKEND_URL}/api/v1/cart`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const result = await response.json();
      return result.data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      console.log(error);
      console.error("Fetching cart data failed:", error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartActions.replaceCart({
        items: cart.items || [],
        totalAmount: cart.totalAmount,
      })
    );

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.items,
          totalAmount: cart.totalAmount,
        }),
        credentials: "include",
      });

      console.log(
        JSON.stringify({
          items: cart.items,
          totalAmount: cart.totalAmount,
        })
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      console.log("Sent cart data successfully");
    } catch (error) {
      console.error("Sending cart data failed:", error);
    }
  };
};
