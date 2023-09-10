import { configureStore } from "@reduxjs/toolkit";
import { appearMenuBar } from "./reducers/appearMenubarReducer";
import { loginSuccessReducer } from "./reducers/loginSuccessReducer";
import { quantityCartReducer } from "./reducers/quantityCartReducer";
import { visibleItems } from "./reducers/visibleItemsReducer";
const store = configureStore({
    reducer: {
        menubar: appearMenuBar.reducer,
        visibleItems: visibleItems.reducer,
        loginSuccess: loginSuccessReducer.reducer,
        quantityCart: quantityCartReducer.reducer
    }
})
export default store