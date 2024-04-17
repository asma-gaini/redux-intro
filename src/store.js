import { createStore } from "redux";
//ma tu inja function mon ru export nemikonim

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
function reducer(state = initialState, action) {
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
//ma store ru misazin ba reducer
const store = createStore(reducer);
//hala b in store mitunim eghdamat dispatch ru ersal konim:
store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdrawal", payload: 200 });
console.log(store.getState());

//on LATER bala mikhaym chand ta dade ru set konim
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
