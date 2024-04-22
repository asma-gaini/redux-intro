import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//toollit khodesh miyad store ru dorost mikone ,thunk ro farakhoni mikone ,
//redux devtool ru mikhone ,2 ta reducer haru tarkib mikone ,...
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
