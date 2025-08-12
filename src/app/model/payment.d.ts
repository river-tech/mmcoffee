import { IHotelBooking } from "./Hotel";
import { IUser } from "./user";

export interface IPayment {
    id : number;
    user : IUser;
    hotelBooking : IHotelBooking;
    amount? : number;
    paymentMethod : EMethodPayment;
    paymentDate : Date;
    createdAt : Date;
    paymentStatus : boolean;
}