import { combineReducers, createStore } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// on reducer yi k b store mifrestim b onvan rishe darnazar gerefte mishe pas ma miyaym hame reducer hamon ro
// dar ye reducer rishe tarkibeshon mikonim va ono vared store mikonim
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//ma store ru misazin ba reducer
const store = createStore(rootReducer);

export default store;
