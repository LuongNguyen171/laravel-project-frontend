import { createSlice } from "@reduxjs/toolkit";

export const appearMenuBar = createSlice({
    name: 'APPEAR',
    initialState: false,
    reducers: {
        APPEAR_MENU_BAR: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});



