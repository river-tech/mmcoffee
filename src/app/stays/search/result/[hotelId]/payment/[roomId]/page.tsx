import { DHotel, DRoom, Duser } from "@/app/fakedb";
import RenderStar from "@/components/renderStar";
import Link from "next/link";
import React from "react";
import { FaMapPin } from "react-icons/fa6";
import Payment from "./Payment";

const page = ({
  params,
}: {
  params: {
    hotelId: string;
    roomId: string;
  };
}) => {
  const selectedHotel = DHotel.find(
    (item) => item.id === Number(params.hotelId)
  );
  const selectedRoom = DRoom.find((item) => item.id === Number(params.roomId)) 
  if(!selectedHotel || !selectedRoom) return <div>Hotel or Room not found</div>
  // console.log(selectedRoom)
  const userInfo =  Duser
  
 
  return <Payment selectedHotel={selectedHotel } selectedRoom={selectedRoom} />;
};

export default page;
