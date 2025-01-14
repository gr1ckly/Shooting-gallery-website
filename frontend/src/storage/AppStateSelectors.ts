import AppState from "./AppState.ts";
import Point from "../models/Point.ts";

export const selectUsername = (state: AppState): string | null => {
    return state.username;
};

export const selectAccessToken = (state: AppState): string | null => {
    return state.accessToken;
};

export const selectLastPoint = (state: AppState): Point | null => {
    return state.lastPoint;
};

export const selectPoints = (state: AppState): Point[] | null => {
    return state.points;
};

export const selectState = (state: AppState): AppState => {
    return state;
};