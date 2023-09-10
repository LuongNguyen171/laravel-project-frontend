import { createSlice } from "@reduxjs/toolkit";

export const loginSuccessReducer = createSlice({
    name: 'loginSuccessReducer',
    initialState: false,
    reducers: {
        LOGIN_SUCCESS_REDUCER: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});



