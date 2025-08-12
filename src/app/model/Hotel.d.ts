import { EHotelStatus } from "../types/enum";

export interface IHotelBooking {
  id: number;
  user?: IUser;
  hotel?: IHotel;
  checkInDate?: Date;
  checkOutDate?: Date;
  status?: boolean;
  hotelBookingRooms?: IHotelBookingRoom[];
  payments?: IPayment[];
  carts?: ICart[];
}
export interface IHotel {
  id: number;
  name: string;
  location?: string;
  address?: string;
  user?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  rating?: number;
  image?: string[];
  reviewList?: IReview[];
  roomList?: IRoom[];
  hotelBooking?: IHotelBooking[];
  createdAt?: Date;
  hotelStatus?: EHotelStatus;
}

export interface IHotelBookingRoom {
  id: number;
  room?: IRoom;
  hotelBooking?: IHotelBooking;
  numRoom?: number;
  pricePerRoom?: number;
}

export interface IfeaturedHotels {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  location: string;
}
