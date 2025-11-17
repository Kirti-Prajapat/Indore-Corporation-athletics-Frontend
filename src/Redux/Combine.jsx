import { combineReducers } from "redux";
import Reducers from "./Reducer";

const root = combineReducers({
    item:Reducers
})

export default root;