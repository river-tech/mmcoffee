import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, {  useEffect } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isopen, setIsopen] = React.useState(false);
  const path = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    try {
      Cookies.remove("session");
      console.log("Đăng xuất thành công");
      router.push("/");
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    setIsopen(false);
  }, [path]);

  // Kiểm tra nếu người dùng đã đăng nhập

  return (
    <>
      <div
        className={`fixed bg-[#706161] w-1/6 h-full p-6 shadow-lg flex flex-col transition-transform duration-500 transform ease-in-out ${
          isopen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isopen && (
          <h1 className="text-white text-2xl font-semibold mb-8 flex justify-center">
            Account Manage
            <GoSidebarExpand
              className="text-black size-6 mt-3 hover:text-gray-800 cursor-pointer"
              onClick={() => setIsopen(false)}
            />
          </h1>
        )}
        <div className="flex-1">
          <ul className="space-y-4">
            <li>
              <Button
                onClick={() => router.push("/profile")}
                className="bg-none w-full text-white primary_bg hover:bg-gray-700 transition duration-300"
              >
                Profile
              </Button>
            </li>
            <li>
              <Button
                onClick={() => router.push("/privacy")}
                className="bg-none w-full text-white primary_bg hover:bg-gray-700 transition duration-300"
              >
                Privacy
              </Button>
            </li>
            <li>
              <Button onClick={()=>router.push('/feedbackList')} className="bg-none w-full text-white primary_bg hover:bg-gray-700 transition duration-300">
                History Feedback
              </Button>
            </li>

            <li>
              <Button onClick={()=>router.push('/help')} className="bg-none w-full text-white primary_bg hover:bg-gray-700 transition duration-300">
                Help
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleLogout()}
            className="bg-none text-white bg-red-500 hover:bg-red-400 transition duration-300"
          >
            Sign out
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="bg-none bg-white text-black hover:bg-gray-200 transition duration-300"
          >
            Home page
          </Button>
        </div>
      </div>

      {!isopen && (
        <div>
          <GoSidebarCollapse
            onClick={() => setIsopen(true)}
            className="text-black size- mt-3 fixed cursor-pointer hover:text-gray-800"
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
