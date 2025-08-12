"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RenderStar from "@/components/renderStar";
import FilterForm from "@/component/FilterForm";
import SortForm from "@/component/SortForm";
import { IRoom } from "@/app/model/Room";
import { ILocation } from "@/app/model/location";
import { IHotel } from "@/app/model/Hotel";
import { isExistRoom } from "@/app/actions/commonFunction";

const StayResult = ({
  location,
  hotel,
}: {
  location: ILocation[];
  hotel: IHotel[];
}) => {
  const router = useRouter();
  const seachparams = useSearchParams();
  const locationParams = seachparams.get("location");
  const checkInParams = seachparams.get("check_in");
  const checkOutParams = seachparams.get("check_out");
  const budgetParams = seachparams.get("budget");
  const roomParams = seachparams.get("room");
  const singleBedParams = seachparams.get("single");
  const doubleBedParams = seachparams.get("double");
  const ratingParams = seachparams.get("rating");

  const [renderHotel, setRenderHotel] = useState<IHotel[]>([]);
  const [inscreasePrice, setInscreasePrice] = useState<Boolean>(false);
  const [inscreaseRating, setInscreaseRating] = useState<Boolean>(false);
  const [nameHotel, setNameHotel] = useState<string>("");
  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  useEffect(() => {
    let filteredHotels = [...hotel];

    if (nameHotel !== "") {
      filteredHotels = filteredHotels.filter((item) =>
        removeAccents(item.name).toLowerCase().includes(nameHotel.toLowerCase())
      );
    } else {
      filteredHotels = hotel;
    }

    if (locationParams) {
      filteredHotels = filteredHotels.filter(
        (item) => item.location === locationParams
      );
    }

    if (budgetParams) {
      const budgetNumber = Number(budgetParams);
      filteredHotels = filteredHotels.filter(
        (item) => item.price !== undefined && item.price <= budgetNumber
      );
    }

    if (roomParams) {
      const roomNumber = Number(roomParams);
      // alert(roomNumber);
      filteredHotels = filteredHotels.filter((item) =>
        item.roomList?.some((room: IRoom) => room?.maxOccupancy === roomNumber)
      );
    }

    if (singleBedParams && !doubleBedParams) {
      filteredHotels = filteredHotels.filter((item) =>
        item.roomList?.some(
          (room: IRoom) => room?.singleBed !== 0 && room.doubleBed === 0
        )
      );
    }

    if (!singleBedParams && doubleBedParams) {
      filteredHotels = filteredHotels.filter((item) =>
        item.roomList?.some(
          (room: IRoom) => room?.doubleBed !== 0 && room.singleBed === 0
        )
      );
    }

    if (singleBedParams && doubleBedParams) {
      filteredHotels = filteredHotels.filter((item) =>
        item.roomList?.some(
          (room: IRoom) => room?.singleBed !== 0 && room?.doubleBed !== 0
        )
      );
    }

    if (ratingParams) {
      const ratingNumber = Number(ratingParams);
      filteredHotels = filteredHotels.filter((item) => {
        return (
          item.rating !== undefined &&
          Math.round(item.rating)  == ratingNumber
        );
      });
    }

    // Kiểm tra nameHotel trước khi lọc theo tên
    if (inscreasePrice) {
      filteredHotels = filteredHotels.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else {
      filteredHotels = filteredHotels.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    if (inscreaseRating) {
      filteredHotels = filteredHotels.sort(
        (a, b) => (a.rating ?? 0) - (b.rating ?? 0)
      );
    } else {
      filteredHotels = filteredHotels.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }

    filteredHotels = filteredHotels.filter((item) =>
      isExistRoom(
        item,
        new Date(checkInParams || ""),
        new Date(checkOutParams || "")
      )
    );

    setRenderHotel(filteredHotels);
  }, [
    hotel,
    locationParams,
    budgetParams,
    roomParams,
    singleBedParams,
    doubleBedParams,
    ratingParams,
    checkInParams,
    checkOutParams,
    nameHotel,
    inscreasePrice,
    inscreaseRating,
  ]);

  return (
    <div>
      <SortForm className="top-[20%] h-25 pt-5 pb-5" Location={location} />
      <div className="flex gap-5 justify-center m-auto w-[90%] pt-[20%]">
        <FilterForm />
        <div className="w-[80%]">
          <div className="m-5 flex gap-2 justify-between">
            <div className="flex gap-2">
              <>
                {!inscreasePrice ? (
                  <Button
                    className="bg-[#4b4846] hover:bg-[#423838]"
                    onClick={() => setInscreasePrice(true)}
                  >
                    Decrease Price
                  </Button>
                ) : (
                  <Button
                    className="bg-[#4b4846] hover:bg-[#423838]"
                    onClick={() => setInscreasePrice(false)}
                  >
                    Increase Price
                  </Button>
                )}
              </>
              <>
                {!inscreaseRating ? (
                  <Button
                    className="bg-[#4b4846] hover:bg-[#423838]"
                    onClick={() => setInscreaseRating(true)}
                  >
                    Decrease Rating
                  </Button>
                ) : (
                  <Button
                    className="bg-[#4b4846] hover:bg-[#423838]"
                    onClick={() => setInscreaseRating(false)}
                  >
                    Increase Rating
                  </Button>
                )}
              </>
            </div>
            <Input
              onChange={(e) => setNameHotel(removeAccents(e.target.value))}
              placeholder="Hotel name ? "
              className="w-[300px] border-[#4b4846] text-[#2c2a29] rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Result: </h1>
          </div>
          <div className=" grid grid-cols-1 gap-8 p-4 ">
            {renderHotel.map((item) => (
              <div
                key={item.id}
                className="
      bg-[#a7a3a0] text-white cursor-pointer rounded-xl shadow-lg p-6 transition transform hover:scale-[1.02] hover:shadow-xl"
                onClick={() =>
                  router.push(
                    `/stays/search/result/${
                      item.id
                    }?location=${encodeURIComponent(
                      locationParams || ""
                    )}&check_in=${encodeURIComponent(
                      checkInParams || ""
                    )}&check_out=${encodeURIComponent(checkOutParams || "")}`
                  )
                }
              >
                <div className="relative h-[200px] w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex flex-col justify-between items-start">
                    <h1 className="text-2xl font-bold leading-tight text-black hover:text-[#6c2b2b]">
                      {item.name}
                    </h1>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-lg flex items-center gap-1 my-2">
                        {item.rating !== undefined &&
                          RenderStar({
                            ratingindex: Math.round(item.rating) + 1,
                          })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-black/80 mb-2">
                    <span className="font-semibold">Địa điểm: </span>
                    {item.location}
                  </p>
                  <p className="text-sm text-black/80 mb-2">
                    <span className="font-semibold">Giá: </span>
                    {item.price} $
                  </p>
                  <p className="text-sm text-black/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayResult;
