import { Duser } from "@/app/fakedb";
import RenderStar from "@/components/renderStar";
import React from "react";
import { FaMapPin } from "react-icons/fa6";

const page = ({
  params,
}:{
  params: {
    hotelId: string;
    roomId: string;
  }
}) => {
  const user = Duser;
  console.log(params.hotelId, params.roomId);

  return (
    <div className="w-screen h-screen gap-10 flex bg-[#f0ecec] pt-[10%] px-20">
      <div className="w-[30%] h-full  flex flex-col items-center">
        <div className="h-[240px] w-full px-6 py-4 bg-[#dcd3d3] rounded-lg flex flex-col shadow-lg hover:scale-[1.02] transition-all">
          <p className="text-black text-center text-sm flex flex-col items-center justify-center gap-2">
            Hotel
            <span className="flex gap-1">{RenderStar({ ratingindex: 4 })}</span>
          </p>
          <h1 className="text-xl font-semibold text-center text-black mt-2">
            Tên khách sạn
          </h1>
          <p className="text-sm text-center flex gap-1 items-center justify-center text-black/70 mt-1">
            <FaMapPin className="inline text-red-700" />
          Địa chỉ</p>
        </div>
      </div>
      <div className="w-[70%] h-full "></div>
    </div>
  );
};

export default page;
