"use client";
import { IHotel, IRoom } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const RoomBooking = ({ HotelItem }: { HotelItem: IHotel }) => {
  const roomList = HotelItem?.roomList ?? [];
  const [increasePrice, setIncreasePrice] = useState(false);
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState<IRoom[]>(roomList);
  const searchParams = useSearchParams();
  const budgetParams = searchParams.get("budget");
  const roomParams = searchParams.get("room");
  const singleBedParams = searchParams.get("single");
  const doubleBedParams = searchParams.get("double");
  const ratingParams = searchParams.get("rating");
  const checkInParams = searchParams.get("check_in");
  const checkOutParams = searchParams.get("check_out");
  

  useEffect(() => {
    let filteredRooms = [...roomList];
  
    if (budgetParams) {
      const budgetNumber = Number(budgetParams);
      filteredRooms = filteredRooms.filter(
        (item) => item.price <= budgetNumber
      );
    }

    if (roomParams) {
      const roomNumber = Number(roomParams);
      filteredRooms = filteredRooms.filter(
        (item) =>
          item.quantityRoom !== undefined && item.quantityRoom === roomNumber
      );
    }

    if (singleBedParams && !doubleBedParams) {
      filteredRooms = filteredRooms.filter(
        (item) => item.singleBed && !item.doubleBed
      );
    } else if (!singleBedParams && doubleBedParams) {
      filteredRooms = filteredRooms.filter(
        (item) => item.doubleBed && !item.singleBed
      );
    } else if (singleBedParams && doubleBedParams) {
      filteredRooms = filteredRooms.filter(
        (item) => item.singleBed && item.doubleBed
      );
    }

    if (ratingParams) {
      const ratingNumber = Number(ratingParams);
      filteredRooms = filteredRooms.filter(
        (item) => (item.rating ?? 0) >= ratingNumber
      );
    }

    if (increasePrice) {
      filteredRooms.sort((a, b) => a.price - b.price);
    } else {
      filteredRooms.sort((a, b) => b.price - a.price);
    }

    if (type !== "") {
      filteredRooms = filteredRooms.filter((item) => item.roomType === type);
    }
    setRooms(filteredRooms);
  }, [
    roomList,
    budgetParams,
    roomParams,
    singleBedParams,
    doubleBedParams,
    ratingParams,
    increasePrice,
    type,
  ]);

  const router = useRouter();

  return (
    <>
      <div className="flex gap-2 justify-between items-center mb-3">
        {increasePrice ? (
          <Button
            className="bg-[#525150] hover:bg-[#423838]"
            onClick={() => setIncreasePrice(false)}
          >
            Decrease Price
          </Button>
        ) : (
          <Button
            className="bg-[#4b4846] hover:bg-[#423838]"
            onClick={() => setIncreasePrice(true)}
          >
            Increase Price
          </Button>
        )}

        <select
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="STANDARD">Standard</option>
          <option value="DELUXE">Deluxe</option>
        </select>
      </div>

      {rooms.map((room, index) => (
        <div
          key={room.id ?? index}
          className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row my-5"
        >
          <div className="relative md:w-1/3 border-r h-[80%] my-auto border-gray-200">
            <img
              src={room.image}
              alt="No image available"
              className="w-full h-48 object-cover"
            />
            {room.status ? (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Available
              </span>
            ) : (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sold Out
              </span>
            )}
          </div>

          <div className="p-4 md:w-2/3">
            <div className="flex items-center justify-between mb-2">
              <h3
                className={`text-xl font-bold ${
                  room.roomType === "STANDARD"
                    ? "text-[#571818]"
                    : "text-[#d43434]"
                }`}
              >
                Room #{room.numberRoom} - {room.roomType}
              </h3>
              {room.quantityRoom && (
                <span className="text-sm text-gray-500">
                  Quantity: {room.quantityRoom}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-2">
              Price:{" "}
              <span className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(room.price)}
              </span>
            </p>

            <p className="text-gray-700 mb-2">
              Max Occupancy:{" "}
              <span className="font-semibold">{room.maxOccupancy} people</span>
            </p>

            <div className="flex space-x-4 mb-4">
              <p className="text-gray-700">
                Single Bed:{" "}
                <span className="font-semibold">{room.singleBed ?? 0}</span>
              </p>
              <p className="text-gray-700">
                Double Bed:{" "}
                <span className="font-semibold">{room.doubleBed ?? 0}</span>
              </p>
            </div>

            <button onClick={()=>router.push(`/stays/search/result/${HotelItem.id}/payment/${room.id}/?check_in=${encodeURIComponent(
                      checkInParams || ""
                    )}&check_out=${encodeURIComponent(
                      checkOutParams || ""
                    )}`)} className="primary_bg hover:bg-[#6a1c1c] text-white w-full px-4 py-2 rounded-md duration-300">
              Book Now
              
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomBooking;
