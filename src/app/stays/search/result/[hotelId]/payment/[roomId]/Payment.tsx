"use client";
import { IHotel } from "@/app/model/Hotel";
import { IRoom } from "@/app/model/Room";
import RenderStar from "@/components/renderStar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMapPin } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DCart, Duser } from "@/app/fakedb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EMethodPayment } from "@/app/types/enum";
import { toast } from "react-toastify";

interface IFormSchema {
  name: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
  NIDNumber: string;
}

const formSchema: z.ZodSchema<IFormSchema> = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .refine(
      (val) => {
        return /^\d+$/.test(val);
      },
      {
        message: "Phone number must be a string of numbers",
      }
    )
    .refine(
      (val) => {
        return val.length === 10;
      },
      {
        message: "Phone number must be 10 digits long",
      }
    ),
  birthday: z
    .date()
    .max(new Date("2010-01-01"), "You must be older than 16 years old"),
  NIDNumber: z
    .string()
    .refine(
      (val) => {
        return /^\d+$/.test(val);
      },
      {
        message: "NIDNumber must be a string of numbers",
      }
    )
    .refine(
      (val) => {
        return val.length === 9;
      },
      {
        message: "NIDNumber must be 9 digits long",
      }
    ),
});

const Payment = ({
  selectedHotel,
  selectedRoom,
}: {
  selectedHotel: IHotel;
  selectedRoom: IRoom;
}) => {
  const user = Duser;
  const cart = DCart.find((item) => item.userId === user.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: new Date(user.birthday),
      NIDNumber: user.NIDNumber,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const searchParams = useSearchParams();
  const checkIn = searchParams.get("check_in");
  const checkOut = searchParams.get("check_out");
  const checkInDate = new Date(checkIn || "");
  const checkOutDate = new Date(checkOut || "");

  // Calculate length of stay
  const oneDay = 24 * 60 * 60 * 1000;
  const dayLength =
    checkOutDate instanceof Date &&
    !isNaN(checkOutDate.getTime()) &&
    checkInDate instanceof Date &&
    !isNaN(checkInDate.getTime())
      ? Math.round((checkOutDate.getTime() - checkInDate.getTime()) / oneDay)
      : 0;

  const [paymentMethod, setPaymentMethod] = useState<EMethodPayment>(EMethodPayment.CASH);

  const handleChangeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value as EMethodPayment); // Handle method change
  };

  const handlePay = () => {
    toast.success("Payment success");
  };

  return (
    <div className="w-full h-full pb-32 gap-10 flex bg-[#f0ecec] pt-[10%] px-20 ">
      {/* Left Section: Hotel and Room Info */}
      <div className="w-[30%] h-fit items-center px-6 py-4 bg-[#f5f2f2] rounded-lg flex flex-col shadow-lg transition-all">
        <div>
          <p className="text-black text-center text-sm flex flex-col items-center justify-center font-bold gap-2">
            Hotel
            <span className="flex gap-1">{RenderStar({ ratingindex: 4 })}</span>
          </p>
          <h1 className="text-xl font-semibold text-center text-black mt-2">{selectedHotel?.name}</h1>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHotel?.address || "")}`}
            className="text-sm text-center flex gap-1 hover:text-[#000] items-center justify-center text-gray-800 mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapPin className="inline text-red-700" />
            {selectedHotel?.address}
          </Link>
          <div className="w-full h-[1px] text-center bg-gray-400 my-3 "></div>
        </div>

        {/* Booking details */}
        <div className="w-full px-8">
          <h1 className="font-bold text-center mb-2">Booking details</h1>
          <div className="flex justify-between gap-10">
            <div>
              <h1 className="font-bold">Check In</h1>
              <p>{checkInDate.toDateString()}</p>
            </div>
            <div>
              <h1 className="font-bold">Check Out</h1>
              <p>{checkOutDate.toDateString()}</p>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-sm text-center mt-2 text-[#3b1010]">
              Total Length of Stay: {dayLength} {dayLength > 1 ? "days" : "day"}
            </h1>
          </div>
          <div className="w-full h-[1px] text-center bg-gray-400 my-3 "></div>
        </div>

        {/* Room Info */}
        <div className="w-full px-8 gap-2">
          <h1 className="font-bold text-center my-2">Room Info</h1>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div>
                Room Number:{" "}
                <span className="text-[#3b1010] font-bold">{selectedRoom?.numberRoom}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <h3
                className={`text-xl font-bold ${selectedRoom?.roomType === "STANDARD" ? "text-[#571818]" : "text-[#d43434]"}`}
              >
                {selectedRoom?.roomType}
              </h3>
              <p className="flex gap-1 items-center justify-center">
                <RenderStar ratingindex={selectedRoom?.rating || 0} />
              </p>
            </div>

            <div className="flex gap-2">
              <h1 className="font-semibold">Price:</h1>
              <p>{selectedRoom?.price} $</p>
            </div>

            <div className="flex gap-2">
              <h1 className="font-semibold">Number of Rooms:</h1>
              <p>{selectedRoom?.maxOccupancy ?? 0} {selectedRoom?.maxOccupancy > 1 ? "rooms" : "room"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Form for User Info */}
      <div className="w-[70%] h-fit">
        <div className="w-full h-fit bg-[#f5f2f2] rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-black mb-4">Enter and check your information</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Fullname</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full p-3 border border-gray-300 rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full p-3 border border-gray-300 rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full p-3 border border-gray-300 rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Birthday</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value.toISOString().split("T")[0]}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="NIDNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">NID Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full p-3 border border-gray-300 rounded-md" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button type="submit" className="px-8 py-3 bg-[#340b0b] text-white rounded-md hover:bg-[#7d2222]">
                  Save Information
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Payment Information */}
        <div className="w-full h-fit bg-[#f5f2f2] rounded-lg shadow-lg p-8 mt-10">
          <h1 className="text-2xl font-semibold text-black mb-6">Payment Information</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">Payment Method</p>
              <select
                onChange={handleChangeMethod}
                value={paymentMethod}
                className="w-32 p-3 border border-gray-300 rounded-md"
              >
                <option value={EMethodPayment.CASH}>Cash</option>
                <option value={EMethodPayment.BANKING}>Banking</option>
              </select>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">Amount to Pay:</p>
              <p className="font-semibold text-[#2b0909]">{selectedRoom?.price} $</p>
            </div>
          </div>

          <div className="text-center mt-6">
            {paymentMethod === EMethodPayment.BANKING ? (
              <>
                <p className="text-lg font-semibold mb-2">Banking:</p>
                <p className="text-lg font-semibold mb-2">1234 5678 9101 1121</p>
                <p className="text-lg font-semibold mb-2">Bank: Vietcombank</p>
              </>
            ) : (
              <p className="text-lg font-semibold mb-2">Pay when you check in</p>
            )}
          </div>

          <div className="text-center mt-6">
            <p className="text-lg font-semibold mb-2">Status of Payment</p>
            <p className="text-lg font-semibold">
              {cart?.paymentStatus ? <span className="text-green-600">Paid</span> : <span className="text-red-600">Not paid</span>}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={()=>handlePay()} className="px-8 py-3 bg-[#3b1010] text-white rounded-md hover:bg-[#571818]">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
