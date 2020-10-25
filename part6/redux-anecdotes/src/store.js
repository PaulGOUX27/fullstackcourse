import {combineReducers, createStore} from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";

export const createAppStore = () => {

    const reducer = combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })

    return createStore(reducer, composeWithDevTools())
}
