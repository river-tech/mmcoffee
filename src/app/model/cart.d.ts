import { IHotelBooking } from "./Hotel";

export interface ICart {
    id: number;
    userId: number;
    hotelBooking?: number;
    quantity?: number;
    price?: number;
    amount?: number; 
    paymentMethod: EMethodPayment;
    paymentDate: Date;
    createdAt: Date;
    paymentStatus: boolean;
}