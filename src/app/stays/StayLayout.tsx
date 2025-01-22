// StayLayout.tsx
"use client";
import Footer from "@/component/Footer";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IFeaturedHotels, ILocationItem } from "../types/index.d";
import SortForm from "@/component/SortForm";



const StayLayout = ({
  Location,
  FeaturedHotels,
}: {
  Location: ILocationItem[];
  FeaturedHotels: IFeaturedHotels[];
}) => {
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[550px] mt-16 px-5 text-center flex flex-col justify-center text-white"
        style={{
          backgroundImage: `url(https://i.pinimg.com/736x/2e/ef/fc/2eeffcc0eea25818fa8d73b7f8bf70ca.jpg)`,
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-sm mb-2 uppercase tracking-wider">
            Find your best hotel
          </h1>
          <p className="text-5xl font-bold">To Enjoy Your Vacation</p>
        </div>

        {/* Search Bar */}
        <SortForm className="bottom-[-4rem]" Location={Location} />
      </div>

      {/* Featured Hotels Section */}
      <section className="py-20 px-5 bg-[#dadada]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-black mb-8">
            Featured Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FeaturedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-[#f5f4f4] rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{hotel.description}</p>
                  <p className="text-[#641717] font-semibold mt-4">
                    {hotel.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <IoLocationSharp className="inline-block mr-1" />
                    {hotel.location}
                  </p>
                  <button className="mt-4 bg-[#8a2121] text-white px-4 py-2 rounded-lg hover:bg-[#be3c3c] transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 px-5 bg-[#9b9a9a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Popular Destinations
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {Location.map((location, index) => (
              <div
                key={index}
                className="w-1/2 md:w-1/4 lg:w-1/6 cursor-pointer hover:shadow-2xl transition transform duration-300 hover:-translate-y-2"
              >
                <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={location.img}
                    alt={location.locationName}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-md font-semibold text-gray-700">
                      {location.locationName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {location.locationAddress}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">
            What Our Customers Say
          </h2>
          <div className="space-y-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="text-lg italic mb-4">
                "The booking process was seamless, and the hotel exceeded my
                expectations. Highly recommended!"
              </p>
              <p className="text-sm font-semibold">- John Doe</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="text-lg italic mb-4">
                "Amazing experience! The customer service was top-notch and the
                facilities were fantastic."
              </p>
              <p className="text-sm font-semibold">- Jane Smith</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="text-lg italic mb-4">
                "Loved every moment of my stay. The location was perfect and the
                staff was very friendly."
              </p>
              <p className="text-sm font-semibold">- Michael Brown</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StayLayout;
