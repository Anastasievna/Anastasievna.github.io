import { ICartProduct, IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  products: ICartProduct[];
  total: number;
}

const initialState: ICartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.products.findIndex(
        (item) => item.product.id === action.payload.id,
      );

      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
        state.products[productIndex].totalPrice += action.payload.price;
      } else {
        state.products.push({
          product: action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }

      state.total = state.products.reduce(
        (sum, current) => sum + current.totalPrice,
        0,
      );
    },
    removeProduct: (
      state,
      action: PayloadAction<{ product: IProduct; type: "one" | "full" }>,
    ) => {
      const productIndex = state.products.findIndex(
        (item) => item.product.id === action.payload.product.id,
      );

      if (productIndex === -1) return;

      if (
        state.products[productIndex].quantity === 1 ||
        action.payload.type === "full"
      ) {
        state.products = state.products.filter(
          (item) => item.product.id !== action.payload.product.id,
        );

        state.total = state.products.reduce(
          (sum, current) => sum + current.totalPrice,
          0,
        );
        return;
      }

      state.products[productIndex].quantity -= 1;
      state.products[productIndex].totalPrice -= action.payload.product.price;

      state.total = state.products.reduce(
        (sum, current) => sum + current.totalPrice,
        0,
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
