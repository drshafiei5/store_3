import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductType } from "../types";
import { RootState } from ".";

type CartItem = ProductType & { cartQuantity: number };

interface CartState {
  cartItems: cartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItem>) {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (cartItemIndex >= 0) {
        state.cartItems[cartItemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeCartItem(state: CartState, action: PayloadAction<CartItem>) {
      const inCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id,
      );
      state.cartItems = inCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCartQuantity(state: CartState, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
        } else if (state.cartItems[itemIndex].cartQuantity === 1) {
          const inCartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload.id,
          );
          state.cartItems = inCartItems;
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseCartQuantity(state: CartState, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearAllCart(state: CartState) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotal(state: CartState) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );

      state.totalQuantity = quantity;
      state.totalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  decreaseCartQuantity,
  increaseCartQuantity,
  clearAllCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectProduct = (productId: number) => (state: RootState) =>
  state.cart.cartItems.find((p) => +p.id === +productId);
