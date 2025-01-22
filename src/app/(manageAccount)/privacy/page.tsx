"use client";
import React from "react";
import { z } from "zod";
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
import Swal from 'sweetalert2'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



const formSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

const page = () => {

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // logic here
  }

  async function handledDeleteAccount() {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", 
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete account!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

          // delete account BE logic here

          try {
            Cookies.remove("session");
            router.push("/");
          } catch (error) {
            console.log(error);
          }
          finally{
            router.refresh();
          }
        } 
        
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#a39e9e] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1000px]">
        <h1 className="text-2xl font-bold text-center mb-6">Privacy</h1>
        {/* change password */}
        <div className="flex flex-col gap-3 items-center justify-center mb-6">
          <h2 className="text-xl font-semibold text-[#6b2a2a]">Change Password</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-[500px] p-6 rounded-lg shadow-md "
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Current password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                        {...field}
                        className="border-gray-600 bg-primaryBg text-black focus:ring focus:ring-gray-400 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      New password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                        className="border-gray-600 bg-primaryBg text-black focus:ring focus:ring-gray-400 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password again"
                        {...field}
                        className="border-gray-600 bg-primaryBg text-black focus:ring focus:ring-gray-400 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Save change
              </Button>
            </form>
          </Form>
        </div>
        
        {/* delete account */}
        <div className="flex flex-col gap-3 items-center justify-center">
          <h2 className="text-xl font-semibold text-[#6b2a2a]">Delete Account</h2>
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className="text-sm font-medium text-black">
              Are you sure you want to delete your account?
            </p>
            <Button
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handledDeleteAccount()}
            >
              Delete Account
            </Button>
          </div>
          </div>
        

      </div>
    </div>
  );
};

export default page;
