const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// ************************************************action creator ***************************
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
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // hala mikhaym begim k ag$ nabood bia aval tabdil haru anjam bede bad dispatch ru b action ersal kon
  // pas bayad az tunk estefade konim yani ma dispatch ru blafasele barnemigardonim
  // va tabeyi k ghrare amaliat rush anjam she ru aval barmigardonim
  //bara inke begim badesh b action bere besh b dispatch dastresi midim
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API call
    //az google b frankfurter api mirim dar https://www.frankfurter.app/  ducumantion
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    //vaghti console.log gereftim didim to rates tu usd zakhire shode bood
    const converted = data.rates.USD;

    //return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdrawal(amount) {
  return { type: "account/withdrawal", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
