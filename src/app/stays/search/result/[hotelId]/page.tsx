"use server";
import { DHotel, DLocation } from "@/app/fakedb";
import FilterForm from "@/component/FilterForm";
import SortForm from "@/component/SortForm";
import RenderStar from "@/components/renderStar";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaMapPin } from "react-icons/fa6";
import RoomBooking from "./RoomBookingItem";

const page = async ({
  params,
}: {
  params: {
    hotelId: string;
  };
}) => {
  const idhotel =  params.hotelId
  const Hotel = DHotel;
  const location = DLocation;
  const HotelItem = Hotel.find((item) => item.id.toString() === idhotel);
  console.log(params.hotelId);

  return (
    <div className="h-fit w-full bg-[#d4cece]">
      <SortForm className="top-[20%] h-25 pt-5 pb-5" Location={location} />
      <div className="flex gap-5 justify-center m-auto w-[90%] pt-[20%]">
        <FilterForm />
        <div className="w-[80%]">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold hover:text-[#3b3131]">
              {HotelItem?.name}
            </h1>
            <p className="flex gap-2 ml-2">
              <RenderStar ratingindex={HotelItem?.rating ?? 0} />
            </p>
            <p className="flex gap-2 items-center">
              <FaMapPin className="text-red-700" />
              <Link
                className="hover:text-[#aa2a2a]"
                href={"https://maps.app.goo.gl/KYw7P8aEv8WStxmV7"}
              >
                {HotelItem?.address}
              </Link>
            </p>
            <div className="grid grid-cols-3">
              {HotelItem?.image &&
                HotelItem.image.map((item, index) => (
                  <div key={index} className="relative h-52 w-full mb-5">
                    <img
                      src={item}
                      alt={HotelItem.name}
                      className="rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
          {HotelItem && <RoomBooking HotelItem={HotelItem} />}
        </div>
      </div>
    </div>
  );
};

export default page;
