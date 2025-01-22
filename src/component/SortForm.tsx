"use client";
import Footer from "@/component/Footer";
import React, { use, useEffect, useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { set, z } from "zod";
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
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { ILocationItem } from "@/app/types";



const SortForm = ({
    Location,
    className
    }: {
    Location: ILocationItem[];
    className? : string;
}) => {
  const params = useSearchParams();
  console.log(params);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [searchLocation, setSearchLocation] = React.useState(params.get("location") ?? "");
  const router = useRouter();
  const formSchema = z
    .object({
      location: z
        .string({
          message: "Where are you going?",
        })
        .refine(
          (value) =>
            Location.some((item: ILocationItem) => item.locationName === value),
          {
            message: "Selected location is not valid.",
          }
        ),
      check_in: z.string().optional(),
      check_out: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.check_in && data.check_out) {
          return new Date(data.check_out) > new Date(data.check_in);
        }
        return true; // If one of them is undefined, skip this validation
      },
      {
        message: "Check-out must be after check-in",
        path: ["check_out"], // Assign error to check_out field
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: params.get("location") ?? "",
      check_in: params.get("check_in") ?? "",
      check_out: params.get("check_out") ?? "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push(
      `/stays/search?location=${encodeURIComponent(
        values.location
      )}&check_in=${encodeURIComponent(
        values.check_in || ""
      )}&check_out=${encodeURIComponent(values.check_out || "")}`
    );
  }

  const handleOpen = () => {
    setOpenLocation(true);
  };
  const locationRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      locationRef.current &&
      !locationRef.current.contains(event.target as Node)
    ) {
      setOpenLocation(false);
    }
  };
  const removeAccents = (str:string) => {
  
    return str
    .normalize('NFD')                           
    .replace(/[\u0300-\u036f]/g, '')            
    .replace(/đ/g, 'd')                         
    .replace(/Đ/g, 'D'); 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [filteredLocations, setFilteredLocations] = useState<ILocationItem[]>(
    []
  );
  const filterLocation = (location: string) => {
    return Location.filter((item) =>
      removeAccents(item.locationName).toLowerCase().includes(location.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredLocations(filterLocation(searchLocation));
    console.log(filteredLocations);
  }, [searchLocation]);

  return (
    <div className={cn(`flex justify-center  w-full absolute  left-0 right-0 mx-auto bg-gray-200 rounded-lg p-10 shadow-xl z-10 max-w-5xl`, className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-start md:items-end w-full gap-6"
        >
          {/* Location Field */}
          <div ref={locationRef} className="flex-1 relative">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1 relative">
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={handleOpen}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-2 text-gray-800"
                      placeholder="Where are you going?"
                      {...field}
                      onChange={(e) => {
                        setSearchLocation(removeAccents(e.target.value)),
                          field.onChange(e.target.value);
                      }}
                      value={searchLocation}
                    />
                  </FormControl>
                  {openLocation && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      <h1 className="font-semibold text-gray-800 px-4 py-2">
                        Recommended Locations
                      </h1>
                      <div className="flex flex-col divide-y divide-gray-200">
                        {filteredLocations.length !== 0 ? (
                          filteredLocations.slice(0, 5).map((item, index) => (
                            <div
                              className="flex gap-5 items-center p-3 hover:bg-gray-100 cursor-pointer"
                              key={index}
                              onClick={() => {
                                setSearchLocation(item.locationName);
                                field.onChange(item.locationName);
                                setOpenLocation(false);
                              }}
                            >
                              <IoLocationSharp className="ml-2 text-xl primary_text" />
                              <div className="ml-3 flex flex-col items-start">
                                <h2 className="text-md font-medium text-gray-700">
                                  {item.locationName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                  {item.locationAddress}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500">
                            No results found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <FormMessage className="absolute top-full left-0 mt-1 text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Check-in Field */}
          <FormField
            control={form.control}
            name="check_in"
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-2 text-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute top-full left-0 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Check-out Field */}
          <FormField
            control={form.control}
            name="check_out"
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-2 text-gray-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute top-full left-0 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
          
          {/* Search Button */}
          <Button
            className="primary_bg hover:bg-[#3e2b2b] text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SortForm;
