"use client";
import { isAvailableRoom } from "@/app/actions/commonFunction";
import { IHotel } from "@/app/model/Hotel";
import { IRoom } from "@/app/model/Room";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { hotelBookings } from "@/app/fakedb";
import { create } from "domain";
import { toast } from "react-toastify";

const RoomBooking = ({ HotelItem }: { HotelItem: IHotel }) => {
  const roomList = HotelItem?.roomList ?? [];
  const [increasePrice, setIncreasePrice] = useState(false);
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState<IRoom[]>(roomList);
  const [cartList, setCartList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const budgetParams = searchParams.get("budget");
  const roomParams = searchParams.get("room");
  const singleBedParams = searchParams.get("single");
  const doubleBedParams = searchParams.get("double");
  const ratingParams = searchParams.get("rating");
  const checkInParams = searchParams.get("check_in");
  const checkOutParams = searchParams.get("check_out");

  useEffect(() => {
    const axiosCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cart`);
        setCartList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    let filteredRooms = [...roomList];
    filteredRooms = filteredRooms.filter((item) => item.status);

    if (checkInParams && checkOutParams) {
      filteredRooms = filteredRooms.filter((item) => {
        return isAvailableRoom(
          item,
          new Date(checkInParams),
          new Date(checkOutParams)
        );
      });
    }

    if (budgetParams) {
      const budgetNumber = Number(budgetParams);
      filteredRooms = filteredRooms.filter(
        (item) => item.price <= budgetNumber
      );
    }

    if (roomParams) {
      const roomNumber = Number(roomParams);
      filteredRooms = filteredRooms.filter(
        (item: IRoom) =>
          item.maxOccupancy !== undefined && item.maxOccupancy === roomNumber
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
    checkInParams,
    checkOutParams,
    type,
  ]);

  const router = useRouter();
  const handleAddItem = (id: number) => {
    // const axiosCart= async () => {
    if (!cartList.includes(id.toString())) {
      setCartList([...cartList, id.toString()]);
      // await axios.post(`http://localhost:3000/cart`, {
      //   id :  idCart;
      //   user : 1;
      //   hotelBooking : {
      //     id : 1;
      //     hotel : 1;
      //     room : id;
      //     checkIn : new Date();
      //     checkOut : new Date();
      //     status : true;
      //     createdAt : new Date();
      //     hotelBookingRooms : cartList;
      //   };
      //   quantity : 1;
      //   createdAt : new Date(Date.now());
      // });
    }
    // };
  };
  const handleRemoveItem = (id: number) => {
    // const removeRooms = async () => {
    if (cartList.includes(id.toString())) {
      setCartList(cartList.filter((item) => item !== id.toString()));
    }
    // await axios.delete(`http://localhost:3000/cart/${id}`);
    // }
  };

  const handlePayment = async(id: number) => {
    if (checkInParams && checkOutParams) {
      // await axios.post(`http://localhost:3000/cart`, {
      //   id : id,
      //   userId : 1,
      //   hotelBooking : {
      //     id : 1,
      //     hotel : 1,
      //     room : id,
      //     checkIn : new Date(checkInParams),
      //     checkOut : new Date(checkOutParams),
      //     status : true,
      //     createdAt : new Date(),
      //     hotelBookingRooms : cartList,
      //   },
      //   status : false,
      //   quantity : 1,
      //   createdAt : new Date(Date.now()),
      // })
      router.push(
        `/stays/search/result/${
          HotelItem.id
        }/payment/${id}?check_in=${encodeURIComponent(
          checkInParams || ""
        )}&check_out=${encodeURIComponent(checkOutParams || "")}`
      );
    }
    else if(!checkInParams && checkOutParams){
      toast.error("Please select check-in date and press Check button !")
    }
    else if(!checkOutParams && checkInParams){
      toast.error("Please select check-out date and press Check button !")
    }
    else {
      toast.error("Please select check-in and check-out date and press Check button !")
    }
  };

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
          className={`${
            cartList.includes(room.id.toString()) ? "bg-gray-200" : "bg-white"
          } shadow-lg rounded-xl overflow-hidden my-4 p-4 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex-1">
              <h3
                className={`text-xl font-semibold ${
                  room.roomType === "STANDARD"
                    ? "text-[#571818]"
                    : "text-[#d43434]"
                } mb-2`}
              >
                Room #{room.numberRoom} - {room.roomType}
              </h3>

              {room.maxOccupancy && (
                <span className="text-xs text-gray-500 block mb-2">
                  Quantity: {room.maxOccupancy}
                </span>
              )}

              <p className="text-sm text-gray-700 mb-1">
                Price:{" "}
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(room.price)}
                </span>
              </p>

              <p className="text-sm text-gray-700 mb-1">
                Max Occupancy:{" "}
                <span className="font-semibold">
                  {room.maxOccupancy} people
                </span>
              </p>

              <div className="flex space-x-3 mb-3 text-sm text-gray-700">
                <p>
                  Single Bed:{" "}
                  <span className="font-semibold">{room.singleBed ?? 0}</span>
                </p>
                <p>
                  Double Bed:{" "}
                  <span className="font-semibold">{room.doubleBed ?? 0}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto">
              <button
                onClick={() => handlePayment(room.id)}
                className="primary_bg hover:bg-[#6a1c1c] text-white w-full md:w-auto px-4 py-2 rounded-md duration-300"
              >
                Book Now
              </button>

              {cartList.includes(room.id.toString()) ? (
                <button
                  onClick={() => handleRemoveItem(room.id)}
                  className="bg-red-600 hover:bg-red-800 text-white w-full md:w-auto px-4 py-2 rounded-md duration-300"
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddItem(room.id)}
                  className="primary_bg hover:bg-[#6a1c1c] text-white w-full md:w-auto px-4 py-2 rounded-md duration-300"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomBooking;
