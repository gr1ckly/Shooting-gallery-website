import {createStore, Reducer} from "redux";
import AppState from "./AppState.ts";
import Action from "../models/Action.ts";
import Point from "../models/Point.ts";

const defaultState: AppState = {
    username: null,
    accessToken: null,
    lastPoint: null,
    points: null
};

const reducer: Reducer<AppState, Action<string | Point | Point[]>> = (state: AppState = defaultState, action: Action<string | Point | Point[]>): AppState => {
    switch (action.type){
        case "SET_POINTS":
            return {...state, points: action.payload as Point[]};
        case "SET_LAST_POINT":
            return {...state, lastPoint: action.payload as Point};
        case "SET_USERNAME":
            return {...state, username: action.payload as string};
        case "SET_ACCESS_TOKEN":
            return {...state, accessToken: action.payload as string};
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;