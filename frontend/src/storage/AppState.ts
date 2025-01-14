import Point from "../models/Point.ts";

export default interface AppState{
    username: string | null,
    accessToken: string | null,
    lastPoint: Point | null,
    points: Point[] | null
}