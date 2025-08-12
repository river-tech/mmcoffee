import { useState } from "react";
import { IHotel, IHotelBooking, IHotelBookingRoom } from "../model/Hotel";
import { set } from "zod";
import { IRoom } from "../model/Room";

export function isExistRoom(
  hotel: IHotel,
  checkInDate: Date,
  checkOutDate: Date
): boolean {
  let busyRoom: IRoom[] = [];
  hotel.hotelBooking?.forEach((booking: IHotelBooking) => {
    if (
      booking.checkInDate &&
      booking.checkOutDate &&
      ((checkInDate >= booking.checkInDate &&
        checkInDate <= booking.checkOutDate) ||
      (checkOutDate >= booking.checkInDate &&
        checkOutDate <= booking.checkOutDate) ||
      (checkInDate <= booking.checkInDate &&
        checkOutDate >= booking.checkOutDate))
    ) {
      booking.hotelBookingRooms?.forEach((room) => {
        if (!busyRoom.some(busy => busy.id === room.room?.id)) {
          busyRoom.push(room.room);
        }
      });
    }
  });
  return hotel.roomList?.length !== busyRoom?.length;
}

export function isAvailableRoom(
  room : IRoom,
  checkInDate: Date,
  checkOutDate: Date
) : boolean{
  for (const booking of room.hotelBookingRooms || []) {
    if (
      booking.hotelBooking?.checkInDate &&
      booking.hotelBooking?.checkOutDate &&
      ((checkInDate >= booking.hotelBooking?.checkInDate &&
        checkInDate <= booking.hotelBooking?.checkOutDate) ||
      (checkOutDate >= booking.hotelBooking?.checkInDate &&
        checkOutDate <= booking.hotelBooking?.checkOutDate) ||
      (checkInDate <= booking.hotelBooking?.checkInDate &&
        checkOutDate >= booking.hotelBooking?.checkOutDate))
    ) {
      return false;
    }
  }
  return true;
}
