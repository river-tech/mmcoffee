"use server";
import { DHotel, DLocation } from "@/app/fakedb";
import FilterForm from "@/component/FilterForm";
import SortForm from "@/component/SortForm";
import RenderStar from "@/components/renderStar";
import Link from "next/link";
import React from "react";
import { FaMapPin } from "react-icons/fa6";
import RoomBooking from "./RoomBookingItem";
import { IHotel } from "@/app/model/Hotel";

const page = ({
  params,
}: {
  params: {
    hotelId: string;
  };
}) => {
  const idhotel = params.hotelId;
  const Hotel = DHotel;
  const location = DLocation;
  
  
  // Tìm khách sạn dựa trên hotelId
  
  const HotelItem = Hotel.find(
    (item) => item.id.toString() === idhotel
  ) as IHotel;

  if (!HotelItem) {
    return (
      <div className="h-screen w-full bg-[#d4cece] flex justify-center items-center">
        <h1 className="text-xl text-red-500">
          Khách sạn không tồn tại hoặc đã bị xóa.
        </h1>
      </div>
    );
  }

  return (
    <div className="h-fit w-full bg-[#d4cece]">
      <SortForm className="top-[20%] h-25 pt-5 pb-5" Location={location} />
      <div className="flex gap-5 justify-center m-auto w-[90%] pt-[20%]">
        <FilterForm />
        <div className="w-[80%]">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold hover:text-[#3b3131]">
              {HotelItem?.name}
            </h1>
            <p className="flex gap-2 ml-2">
              <RenderStar ratingindex={HotelItem?.rating ?? 0} />
            </p>
            <p className="flex gap-2 items-center">
              <FaMapPin className="text-red-700" />
              <Link
                className="hover:text-[#aa2a2a] hover:underline"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  HotelItem?.address || ""
                )}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HotelItem?.address}
              </Link>
            </p>

            {/* Hiển thị ảnh khách sạn */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {HotelItem?.image &&
                HotelItem.image.map((item, index) => (
                  <div key={index} className="relative h-52 w-full mb-5">
                    <img
                      src={item}
                      alt={HotelItem.name}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Hiển thị phần phòng */}
          <div className="mt-5">
            <RoomBooking HotelItem={HotelItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
