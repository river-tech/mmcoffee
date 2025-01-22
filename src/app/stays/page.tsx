import React from "react";
import StayLayout from "./StayLayout";
import { DLocation } from "../fakedb";

// Dữ liệu mẫu cho khách sạn
const FeaturedHotels = [
  {
    id: 1,
    name: "Hotel Sunshine",
    description: "Enjoy a sunny stay with excellent amenities.",
    price: "$120/night",
    imageUrl:
      "https://i.pinimg.com/736x/70/9a/a6/709aa615268c9ebd7940c9a14e2c1e47.jpg",
    location: "Đà Nẵng, Việt Nam",
  },
  {
    id: 2,
    name: "Mountain View Resort",
    description: "Experience serene mountain views and fresh air.",
    price: "$150/night",
    imageUrl:
      "https://i.pinimg.com/736x/70/9a/a6/709aa615268c9ebd7940c9a14e2c1e47.jpg",
    location: "Đà Lạt, Việt Nam",
  },
  {
    id: 3,
    name: "Sea Breeze Hotel",
    description: "Relax by the sea with our top-notch services.",
    price: "$180/night",
    imageUrl:
      "https://i.pinimg.com/736x/70/9a/a6/709aa615268c9ebd7940c9a14e2c1e47.jpg",
    location: "Nha Trang, Việt Nam",
  },
];

const Location = DLocation;

const page = () => {
  return (
    <>
      <StayLayout Location={Location} FeaturedHotels={FeaturedHotels} />
    </>
  );
};

export default page;
