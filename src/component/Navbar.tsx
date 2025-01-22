"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaKey, FaLock, FaMessage, FaPersonRifle } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";
import { FiMessageCircle } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";

const Navigation = [
  { name: "Home", link: "/" },
  { name: "Stays", link: "/stays" },
  { name: "Flights", link: "/flights" },
  { name: "Helps", link: "/helps" },
  { name: "Booking history", link: "/orders" },
  { name: "Be a host", link: "/business" },
];

const user = {
  avar: "https://i.pinimg.com/236x/50/d4/29/50d429ea5c9afe0ef9cb3c96f784bea4.jpg",
  name: "Nguyễn Hà",
};

const Navbar = ({ email }: { email: string }) => {
  const pathname = usePathname();
  const hiddenNavbarPaths = [
    "/profile",
    "/privacy",
    "/display",
    "/feedbackList",
    "/help",
  ]; // Các route cần ẩn Navbar
  const isHiddenNavbar = hiddenNavbarPaths.includes(pathname);
  const router = useRouter();
  console.log("email", email);
  // Kiểm tra nếu người dùng đã đăng nhập

  const handleLogout = () => {
    try {
      Cookies.remove("session");
      console.log("Đăng xuất thành công");
      router.refresh();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isHiddenNavbar ? (
        <div className="flex flex-col w-full h-20 text-black font-serif fixed top-0 z-50 ">
          {/* Header */}
          <div  className="flex py-5 text-center justify-between items-center px-5 bg-[#d4d3d3]">
            <h1 onClick={()=>router.push("/")} className="text-2xl pl-5 font-bold text-black cursor-pointer">Booking</h1>
            <div className="flex gap-5">
              {!email ? (
                <>
                  <Button
                    onClick={() => router.push("/register")}
                    className="text-white primary_bg border border-gray-300 px-4 py-2 transition duration-300 rounded-md hover:bg-yellow-600"
                  >
                    Register
                  </Button>
                  <Button
                    onClick={() => router.push("/login")}
                    className="text-white primary_bg border border-gray-300 px-4 py-2 transition duration-300 rounded-md hover:bg-yellow-600"
                  >
                    Sign in
                  </Button>
                </>
              ) : (
                <div className="flex flex-row-reverse gap-4 items-center mr-2">
                  <HoverCard>
                    <HoverCardTrigger className="flex justify-end items-center gap-4 cursor-pointer">
                      <Avatar>
                        <button onClick={() => router.push("/profile")}>
                          <AvatarImage src={user.avar} />
                        </button>
                        <AvatarFallback>{user.name}</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="m-3 bg-[#eeecec] border-none">
                      <p className="text-sm py-1 text-end px-1 font-semibold">
                        {user.name}
                      </p>
                      <ul className="flex flex-col gap-2 mt-2 space-y-2">
                        <li className="flex items-end gap-2">
                          <Button
                            onClick={() => router.push("/profile")}
                            className="w-full text-left px-4 py-2 primary_bg hover:bg-gray-800 rounded-md"
                          >
                            View profile
                            <CgProfile />
                          </Button>
                        </li>
                        <li className="flex items-end gap-2">
                          <Button
                            onClick={() => router.push("/privacy")}
                            className="w-full text-left px-4 py-2 primary_bg hover:bg-gray-800 rounded-md"
                          >
                            Privacy
                            <FaLock className="text-sm" />
                          </Button>
                        </li>
                        <li className="flex items-end gap-2">
                          <Button
                            onClick={() => handleLogout()}
                            className="w-full text-left px-4 py-2 primary_bg hover:bg-gray-800 rounded-md"
                          >
                            Sign out
                            <FaSignOutAlt />
                          </Button>
                        </li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>

                  <Link href="notification">
                    <LuShoppingBag className="text-2xl text-gray-800 " />
                  </Link>
                  <Link href="/message">
                    <FiMessageCircle className="text-2xl text-gray-800 " />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-10 border-gray-200 py-3 bg-[#afaeae]">
            {Navigation.map((nav, index) => (
              <React.Fragment key={index}>
                { pathname.includes(nav.link) && nav.link!="/" ? (
                  <Link
                    className="uppercase font-medium text-[#731f1f] transition duration-300"
                    href={nav.link}
                  >
                    {nav.name}
                  </Link>
                ) : (
                  <Link
                    className="text-black uppercase font-medium hover:text-[#dc6666] transition duration-300"
                    href={nav.link}
                  >
                    {nav.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default Navbar;
