"use client";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9\-\+\s()]{9,15}$/, "Invalid phone number"),
  address: z.object(
    {
      streets: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
    },
    {
      message: "Address is not available",
    }
  ),
  birth: z.string().superRefine((val, ctx) => {
    const birthDate = new Date(val);
    if (isNaN(birthDate.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid birth date",
      });
      return;
    }
    const ageInMilliseconds = new Date().getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    if (ageInYears < 18) {
      ctx.addIssue({
        code: "custom",
        message: "You must be at least 18 years old.",
      });
    }
  }),
  NIDcard: z
    .string()
    .length(13, "National ID must be exactly 13 digits")
    .regex(/^\d{13}$/, "National ID must contain only digits")
    .optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

const FormProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: {
        streets: "",
        city: "",
        country: "",
      },
      birth: "2000-01-01",
      NIDcard: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Profile updated successfully");
    // You can also send `values` to your backend here
  }

  const [img, setImg] = useState<string | null>(null);

  const router = useRouter();

  return (
    <div className="bg-[#a39e9e] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1000px]">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
        <div className="flex flex-col gap-3 items-center justify-center mb-6">
          <img
            src={img || "/images/default-avatar.png"}
            alt="profile"
            className="rounded-full object-cover h-36 w-36"
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setImg(res[0].url);
                console.log("Files: ", res);
              }
            }}
            onUploadError={(error: Error) => {
              console.error("Upload Error: ", error);
            }}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
          >
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birth Date Field */}
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => form.setValue("birth", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* National ID Card Field */}
            <FormField
              control={form.control}
              name="NIDcard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="National ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address - City Field */}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address - Street Field */}
            <FormField
              control={form.control}
              name="address.streets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address - Country Field */}
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Buttons */}
            <div className="flex justify-between mt-6 col-span-1 sm:col-span-2">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                type="button"
                className="w-1/3"
              >
                Back To Home
              </Button>
              <Button type="submit" className="w-1/3 bg-[#4e3b1a]">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormProfile;
