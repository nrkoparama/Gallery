import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./slices/account";

const store = configureStore({
    reducer: {
        account: accountReducer,
    }
});

export default store;