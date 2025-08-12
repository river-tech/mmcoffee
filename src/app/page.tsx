"use client";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import WelcomeTheme from "@/component/WelcomeTheme";
import { Duser } from "./fakedb";


const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10).max(500),
});

const user = Duser;
const avar = "https://i.pinimg.com/736x/4a/f9/9e/4af99e91df503cdc1372a6962925cec4.jpg";

const featureHomes = [
  {
    name: "Cozy Home in Paris",
    location: "Paris, France",
    img: "https://i.pinimg.com/736x/4a/3b/bf/4a3bbfef56c8bedc12977542508640bc.jpg",
    price: 20,
  },
  {
    name: "Modern Loft in New York",
    location: "New York, USA",
    price: 15,
    img: "https://i.pinimg.com/736x/4a/3b/bf/4a3bbfef56c8bedc12977542508640bc.jpg",
  },
  {
    name: "Beach House in Maldives",
    location: "Maldives",
    price: 30,
    img: "https://i.pinimg.com/736x/4a/3b/bf/4a3bbfef56c8bedc12977542508640bc.jpg",
  },
];

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [hoverRating, setHoverRating] = useState<number>(0);
  const router = useRouter()

  return (
    <div className="flex flex-col">
      
      <WelcomeTheme userName={user.name} backgroundUrl={avar} />
      
      {/* header */}
      {/* <div className="relative bg-[url('https://i.pinimg.com/736x/64/f7/8d/64f78daedff642c605dc3bab2604e832.jpg')] bg-cover bg-center h-[550px] mt-[60px] px-5 text-center flex flex-col justify-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <p className="text-xs mb-2">WELCOME TO</p>
          <h1 className="text-6xl font-bold">Booking</h1>
        </div>
      </div> */}
      {/* role */}
      <div className="primary_bg bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Find Your Perfect Stay & Flight
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Connecting hosts and guests for unforgettable travel experiences.
        </p>
        <div className="flex mt-8 gap-5">
          <Button onClick={()=>router.push('/host')} className="bg-[#C19A6B] px-6 py-3 rounded-md text-white font-semibold hover:bg-[#a37e55] transition">
            Become a Host
          </Button>
          <Button onClick={()=>router.push('/stays')} className="bg-white px-6 py-3 rounded-md primary_text font-semibold hover:bg-gray-200 transition">
            Find a Home
          </Button>
        </div>
      </div>
      {/* Our Services */}
      <section className="bg-gray-100 primary_text py-20 px-5 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {/* Service 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-yellow-500 text-5xl mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Find the Perfect Stay
            </h3>
            <p className="text-gray-600">
              Discover thousands of homes worldwide tailored to your needs and
              budget.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-yellow-500 text-5xl mb-4">
              <i className="fas fa-home"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Host and Earn Money</h3>
            <p className="text-gray-600">
              List your property and start earning by hosting travelers from
              around the globe.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-yellow-500 text-5xl mb-4">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Enjoy safe and secure transactions for both guests and hosts.
            </p>
          </div>
        </div>
      </section>
      {/* reviews */}

      {/* feature */}
      <section className="py-20 px-5 bg-[#4d4848]">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          Featured Homes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featureHomes.map((home, index) => (
            <div key={index} className="bg-white p-5 rounded-md shadow-md">
              <div className="relative h-52 w-full mb-5">
                <Image
                  src={home.img}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold">{home.name}</h3>
              <p className="text-gray-500">{home.location}</p>
              <p className="text-[#C19A6B] mt-2">${home.price}/night</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-gray-100 bg-cover bg-center h-fit py-10 flex flex-col justify-center items-center primary_text text-center">
        <h2 className="text-4xl font-bold text-center mb-10">
          We Value Your Feedback
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
          >
            {/* Fullname */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your fullname"
                      {...field}
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => field.onChange(star)}
                          className="cursor-pointer text-3xl text-[#8b3531]"
                        >
                          {hoverRating >= star ||
                          Number(field.value) >= star ? (
                            <AiFillStar />
                          ) : (
                            <AiOutlineStar />
                          )}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your feeling about this web"
                      {...field}
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md h-[200px] w-full resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#35110f] hover:bg-[#8b332e] text-white font-semibold py-2 rounded-md"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
