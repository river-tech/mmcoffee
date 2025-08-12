import { IHotel } from "./Hotel";
import { IUser } from "./user";

export interface IChat {
    id : number;
    hotelId : number;
    fromUserId : number;
    toUserId : number;
    content : string;
    createdAt : Date;
}