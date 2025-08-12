"use client";

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
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const LoginForm = () => {
    const router= useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
   function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const session = {
        userId: "123",
        email: values.email,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),  
      };

      Cookies.set("session", JSON.stringify(session), {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      toast.success("Bạn vừa đăng nhập thành công");
      router.push("/");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div className="max-w-[400px] mx-auto flex flex-col justify-center mt-10 h-screen ">
      <h1 className="text-2xl font-semibold text-center mb-6 text-[#3f1010]">
        Register
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-secondaryBg p-6 rounded-lg shadow-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border-gray-600 bg-primaryBg text-white focus:ring focus:ring-gray-400 focus:border-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border-gray-600 bg-primaryBg text-white focus:ring focus:ring-gray-400 focus:border-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-sm text-center text-black">
            <span>If you already have an account, please </span>
            <Link   
              href="/register"
              className="text-[#521d1d] hover:underline font-medium"
            >
              Register
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
