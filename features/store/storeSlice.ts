import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { CheckoutItem, ShopItem, SizeType, StoreState } from "./intefaces";
import { fetchPage, callMakeOrder } from "./storeAPI";

const initialState: StoreState = {
    loading: false,
    pageCount: 1,
    cart: [],
    items: [],
    currentProduct: undefined,
    currentSize: undefined,
};

export const fetchPageAction = createAsyncThunk(
    "store/fetchPage",
    async (page: number) => {
        const response = await fetchPage(page);
        return response;
    }
);

export const makeOrder = createAsyncThunk(
    "store/makeOrder",
    async (cart: CheckoutItem[]) => {
        const order = cart.map((checkoutItem) => {
            return { size: checkoutItem.size, id: checkoutItem.item.id };
        });
        const response = await callMakeOrder(order);
        return response.orderId;
    }
);

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setSize: (state, action: PayloadAction<SizeType>) => {
            state.currentSize = action.payload;
        },
        addToCart: (state, action: PayloadAction<[ShopItem, SizeType]>) => {
            const [item, size] = action.payload;
            const orderItem = { item, size };
            state.cart = [...state.cart, orderItem];
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(
                (checkoutItem, idx) => idx !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPageAction.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pageCount = action.payload.pageCount;
            })
            .addCase(fetchPageAction.rejected, (state, action) => {})
            .addCase(makeOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = [];
            })
            .addCase(makeOrder.rejected, (state, action) => {});
    },
});

export const { setSize, addToCart, removeFromCart } = storeSlice.actions;

export const selectStore = (state: AppState) => state.store;

export default storeSlice.reducer;
