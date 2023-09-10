import { createSlice } from "@reduxjs/toolkit";

export const quantityCartReducer = createSlice({
    name: 'quantityCartReducer',
    initialState: 0,
    reducers: {
        QUANTITY_CART_REDUCER: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});



