import { combineReducers, createStore } from "redux";
//ma tu inja function mon ru export nemikonim

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

// on reducer yi k b store mifrestim b onvan rishe darnazar gerefte mishe pas ma miyaym hame reducer hamon ro
// dar ye reducer rishe tarkibeshon mikonim va ono vared store mikonim
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//ma store ru misazin ba reducer
const store = createStore(rootReducer);
//hala b in store mitunim eghdamat dispatch ru ersal konim:
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdrawal", payload: 200 });
// console.log(store.getState());

//on LATER bala mikhaym chand ta dade ru set konim
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//kar ba action creators : tavabeyi k bian in dispatch haru b tor khodkar anjam bedn
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdrawal(amount) {
  return { type: "account/withdrawal", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdrawal(200));
store.dispatch(requestLoan(1000, "buy a car"));
store.dispatch(payLoan());

console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("asma gaini", "0371560004"));
console.log(store.getState());
