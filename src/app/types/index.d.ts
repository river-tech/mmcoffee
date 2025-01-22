import exp from "constants";
import { EHotelStatus, EItemtype, ERoomStatus, ERoomType } from "./enum";

export interface IReviewItem {
  id: number;
  hotelName: string;
  review: string;
  date: string;
  rating: number;
}

export interface ILocationItem {
  locationName: string;
  locationAddress: string;
  img: string;
}

export interface IFeaturedHotels {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  location: string;
}

export interface ILocation {
  locationName: string;
  locationAddress: string;
  img: string;
}


export interface IReview {
  id: number;
  hotelId: number;
  image? : string[];
  ratingIndex : number;
  content : string;
  date : string;
}

export interface IHotel {
  id: number;
  name: string;
  location: string;
  address?: string;
  user?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  price: number;
  imageUrl: string;
  rating?: number;
  image?: string[];
  reviewList?: IReview[];
  roomList?: IRoom[];
  hotelBooking?: IHotelBooking[];
  createdAt?: Date;
  hotelStatus?: EHotelStatus;
}



export interface IHotelBooking {
  id: number;
  user?: IUser;
  hotel?: IHotel;
  checkInDate?: string;
  checkOutDate?: string;
  bookingDate?: string;
  status?: boolean;
  hotelBookingRooms?: IHotelBookingRoom[];
  bookings?: IBooking[];
  ratings?: IRating[];
  payments?: IPayment[];
  carts?: ICart[];
}

export interface IRoom {
  id: number;
  numberRoom: number;
  roomType: ERoomType;
  price: number;
  maxOccupancy: number;
  quantityRoom? : number;
  status: boolean;
  hotel?: IHotel; // Hotel ID;
  hotelBookingRooms?: IHotelBookingRoom[];
  singleBed?: number;
  doubleBed?: number;
  image?: string;
  rating?: number;
}


export interface IHotelBookingRoom {
  id: number;
  room: IRoom;
  hotelBooking: IHotelBooking;
  numRoom: number;
  pricePerRoom: number;
}

export interface IBooking {
  id: number;
  flightBooking?: IFlightBooking;
  hotelBooking?: IHotelBooking;
}

export interface ICart {
  id: number;
  user: IUser;
  itemType: EItemtype;
  flightBooking?: IFlightBooking;
  hotelBooking?: IHotelBooking;
  quantity: number;
  price: number;
  createdAt: string;
}


