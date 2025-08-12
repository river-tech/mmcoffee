import { IHotelBookingRoom } from "./Hotel";

export interface IRoom {
  id: number;
  numberRoom: number;
  roomType: ERoomType;
  price: number;
  maxOccupancy: number;
  status: boolean;
  hotel?: string;
  hotelBookingRooms?: IHotelBookingRoom[];
  singleBed?: number;
  doubleBed?: number;
  rating?: number;
}
