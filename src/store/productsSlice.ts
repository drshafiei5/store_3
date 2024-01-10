import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import productService from "../services/productService";
import isOutDated from "../utils/isOutDated";
import { ProductType } from "../types";
import { AppThunk, RootState } from ".";

interface ProductsState {
  entities: Array<ProductType>;
  isLoading: boolean;
  createProductLoading: boolean;
  error: string | null;
  lastFetch: number | null;
  updateProductLoading: boolean;
}

const initialState: ProductsState = {
  entities: [],
  isLoading: true,
  createProductLoading: false,
  updateProductLoading: false,
  error: null,
  lastFetch: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested: (state: ProductsState) => {
      state.isLoading = true;
    },
    productsReceived: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    productsRequestFailed: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    productCreateRequested: (state: ProductsState) => {
      state.error = null;
      state.createProductLoading = true;
    },
    productCreateRequestedFailed: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.error = action.payload;
      state.createProductLoading = false;
    },
    productCreated: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.entities = [action.payload, ...state.entities];
      state.error = null;
      state.createProductLoading = false;
    },
    productRemoved: (state: ProductsState, action: PayloadAction<number>) => {
      state.entities = state.entities.filter(
        (product) => product.id !== action.payload,
      );
      state.error = null;
    },
    productUpdateRequested: (state: ProductsState) => {
      state.error = null;
      state.updateProductLoading = true;
    },
    productUpdateRequestedFailed: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.error = action.payload;
      state.updateProductLoading = false;
    },
    productUpdated: (
      state: ProductsState,
      action: PayloadAction<ProductType>,
    ) => {
      state.entities = state.entities.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
      state.error = null;
      state.updateProductLoading = false;
    },
  },
});

const { actions, reducer: productsReducer } = productsSlice;

const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productRemoved,
  productCreated,
  productCreateRequested,
  productCreateRequestedFailed,
  productUpdated,
  productUpdateRequested,
  productUpdateRequestedFailed,
} = actions;

const removeProductRequested = createAction("products/removeProductRequested");
const removeProductRequestedFailed = createAction(
  "products/removeProductRequestedFailed",
);

export const loadProductsList = (): AppThunk => async (dispatch, getState) => {
  const { lastFetch } = getState().products;
  if (isOutDated(Number(lastFetch))) {
    dispatch(productsRequested());
    try {
      const data = await productService.getAll();
      dispatch(productsReceived(data || []));
    } catch (error: any) {
      dispatch(productsRequestFailed(error.message));
    }
  }
};

export const createProduct =
  (payload: ProductType): AppThunk =>
  async (dispatch) => {
    dispatch(productCreateRequested());
    try {
      const content = await productService.create(payload);
      dispatch(productCreated(content));
      return content;
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(productCreateRequestedFailed(error.response.data.message));
        return;
      }
      const { message } = error.response.data.error;
      dispatch(productCreateRequestedFailed(message));
    }
  };

export const updateProduct =
  (payload: ProductType): AppThunk =>
  async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
      const content = await productService.update(payload.id);
      dispatch(productUpdated(payload));
      return content;
    } catch (error) {
      if (error.response?.status === 500) {
        dispatch(productUpdateRequestedFailed(error.response.data.message));
        return;
      }
      const { message } = error.response?.data.error;
      dispatch(productUpdateRequestedFailed(message));
    }
  };

export const removeProduct =
  (productId?: string): AppThunk =>
  async (dispatch) => {
    dispatch(removeProductRequested());
    try {
      const id = await productService.remove(productId || "");
      dispatch(productRemoved(id));
    } catch (error) {
      dispatch(removeProductRequestedFailed());
    }
  };

export const selectProductsRateAvg = (state: RootState) => {
  const products = [...state.products.entities];
  return (
    products.reduce((total, next) => total + next?.rating?.rate || 0, 0) /
      products.length || 0
  );
};

export const selectSumProducts = (state: RootState) => {
  const products = [...state.products.entities];
  return products.reduce((total, next) => total + +next?.price || 0, 0);
};

export const selectProducts = (state: RootState) => state.products.entities;
export const selectProductsLoadingStatus = (state: RootState) =>
  state.products.isLoading;
export const selectProductCreatedStatus = (state: RootState) =>
  state.products.createProductLoading;
export const selectProductsErrors = (state: RootState) => state.products.error;

export default productsReducer;
