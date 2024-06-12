import { Route } from "./route.model";

export interface Stop {

    id?: number;
    name?: string;
    lat: number | null;
    lng: number | null;
    route: Route | null;

}

export type GetStopResponse = {

    message: string;
    data: Stop[];

}

export type GetCreateStopResponse = {
    message: string;
    data: Stop;
}