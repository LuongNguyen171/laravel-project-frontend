import { createSlice } from "@reduxjs/toolkit";

export const visibleItems = createSlice({
    name: 'visible',
    initialState: 8,
    reducers: {
        VISIBLE_ITEMS: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});



