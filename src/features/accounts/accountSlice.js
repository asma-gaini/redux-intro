import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  //esm
  name: "account",
  //meghdar avalie ha
  initialState,
  //reducer ha
  reducers: {
    //esm hamon action creator ha
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdrawal(state, action) {
      state.balance -= action.payload;
    },
    // requestLoan(state, action) {
    //   if (state.loan > 0) return;
    //vaghti darim az toolkit estefade mikonim nemitunim ono mese inja peykar bandi konim
    //faghta ta action.payload dg baghie nemishe
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance += action.payload.amount;
    // },
    requestLoan: {
      prepare(amount, purpose) {
        //inja miyaym ye obj barmigardonim k b reducer bedim
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        // vaghti darim az toolkit estefade mikonim nemitunim ono mese inja peykar bandi konim
        // faghta ta action.payload dg baghie nemishe

        //bara inke betunim peykar bandi konim miyaym  reducer ru b sorat obj joda mikonim
        //bad ghabl reducermon miyam dade hayi k mikhaym ru migirim(prepare)

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdrawal, requestLoan, payLoan } =
  accountSlice.actions;

console.log(requestLoan(1000, "buy car"));
export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdrawal":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       // LATER
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// // ************************************************action creator ***************************
// //hala b in store mitunim eghdamat dispatch ru ersal konim:
// // store.dispatch({ type: "account/deposit", payload: 500 });
// // store.dispatch({ type: "account/withdrawal", payload: 200 });
// // console.log(store.getState());

// //on LATER bala mikhaym chand ta dade ru set konim
// // store.dispatch({
// //   type: "account/requestLoan",
// //   payload: { amount: 1000, purpose: "Buy a car" },
// // });
// // console.log(store.getState());

// // store.dispatch({ type: "account/payLoan" });
// // console.log(store.getState());

// //kar ba action creators : tavabeyi k bian in dispatch haru b tor khodkar anjam bedn
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   // hala mikhaym begim k ag$ nabood bia aval tabdil haru anjam bede bad dispatch ru b action ersal kon
//   // pas bayad az tunk estefade konim yani ma dispatch ru blafasele barnemigardonim
//   // va tabeyi k ghrare amaliat rush anjam she ru aval barmigardonim
//   //bara inke begim badesh b action bere besh b dispatch dastresi midim
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     //API call
//     //az google b frankfurter api mirim dar https://www.frankfurter.app/  ducumantion
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     //vaghti console.log gereftim didim to rates tu usd zakhire shode bood
//     const converted = data.rates.USD;

//     //return action
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdrawal(amount) {
//   return { type: "account/withdrawal", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
