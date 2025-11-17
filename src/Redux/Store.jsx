// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";
// import programReducer from "../features/programSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     program: programReducer,
//   },
// });

import { applyMiddleware, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import root from './Combine'

const Store = legacy_createStore(root, applyMiddleware(thunk))

export default Store;
