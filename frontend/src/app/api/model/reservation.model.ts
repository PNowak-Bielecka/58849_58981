import { User } from "./user.model";

export enum ReservationStatus {
    NEW = "NEW",
    ACCEPTED = "ACCEPTED",
    IN_PROGRESS = "IN PROGRESS",
    REJECTED = "REJECTED",
    CONFIRMED = "CONFIRMED",
    USED = "USED",
    CANCELED = "CANCELED"
}

export interface Reservation {

    id?: string;
    from?: string;
    to?: string;
    status?: ReservationStatus;
    user?: User | null;
    userId?: number;
}
