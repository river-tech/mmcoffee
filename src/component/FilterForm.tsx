"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const formSchema = z.object({
  room: z.number().nonnegative(),
  bedType: z.object({
    single: z.boolean(),
    double: z.boolean(),
  }),
  rating: z.number().min(0).max(5),
});

const FilterForm = () => {
  const router = useRouter();
  const [budget, setBudget] = useState([100]);
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room: 0,
      bedType: {
        single: false,
        double: false,
      },
      rating: 0,
    },
  });
  const [hoverRating, setHoverRating] = useState<number>(0);
  const pathname = usePathname();
  const displayAddBtn = pathname.includes("/result");
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (values.room !== 0) {
      newSearchParams.set("room", String(values.room));
    } else {
      newSearchParams.delete("room");
    }

    if (values.bedType.single) {
      newSearchParams.set("single", "true");
    } else {
      newSearchParams.delete("single");
    }

    if (values.bedType.double) {
      newSearchParams.set("double", "true");
    } else {
      newSearchParams.delete("double");
    }

    if (values.rating !== 0) {
      newSearchParams.set("rating", String(values.rating));
    } else {
      newSearchParams.delete("rating");
    }

    const budgetValue = Math.round((2000 * budget[0]) / 100);
    if (budgetValue !== 2000) {
      newSearchParams.set("budget", String(budgetValue));
    } else {
      newSearchParams.delete("budget");
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }

  const handleResetFilter = () => {
    form.reset({
      room: 0,
      bedType: {
        single: false,
        double: false,
      },
      rating: 0,
    });
    setBudget([100]);
    router.push(`${pathname}`);
  };

  return (
    <div className="w-[20%] bg-white h-fit py-2 px-2 rounded-lg flex flex-col justify-center ">
      <h1 className="text-center text-xl  py-4 font-bold">Filter by :</h1>
      <div className="flex flex-col gap-3">
        <p className=" font-bold ">Your budget:</p>
        <div className="flex justify-between">
          0$ - {Math.round((2000 * budget[0]) / 100)}$
        </div>
        <Slider
          onValueChange={(value) => setBudget(value)}
          defaultValue={[100]}
          max={100}
          step={1}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 mt-10"
        >
          <span className="font-bold">Quantity: </span>
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem className="flex items-center justify-around">
                <FormLabel>Quantity: </FormLabel>
                <FormControl>
                  <Input
                    className="w-[120px]"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 mt-3">
            <span className="font-bold ">Bed type: </span>
            <FormField
              control={form.control}
              name="bedType.single"
              render={({ field }) => (
                <FormItem className="flex items-center gap-10 justify-around">
                  <FormLabel>Single</FormLabel>
                  <FormControl>
                    <Input
                      className="size-4 rounded-lg cursor-pointer"
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedType.double"
              render={({ field }) => (
                <FormItem className="flex items-center gap-10 justify-around cursor-pointer">
                  <FormLabel>Double</FormLabel>
                  <FormControl>
                    <Input
                      className="size-4 rounded-lg"
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <>
            {!displayAddBtn && (
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-1 justify-start">
                    <p className="font-bold mt-1 ">Rating: </p>
                    <FormControl>
                      <div className="flex pl-1 mb-10  space-x-1 size-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => field.onChange(star)}
                            className="cursor-pointer text-xl text-yellow-500 pl-2 "
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
                  </FormItem>
                )}
              />
            )}
          </>
          <Button
            type="submit"
            className="text-right w-full bg-[#4b4846] hover:bg-[#322b2b]"
          >
            Filter
          </Button>
          <Button
            onClick={() => handleResetFilter()}
            className="text-right w-full bg-[#09777a] hover:bg-[#0d4e4f]"
          >
            Reset
          </Button>
          
        </form>
      </Form>
    </div>
  );
};

export default FilterForm;
