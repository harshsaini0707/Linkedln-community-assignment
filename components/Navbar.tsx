"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [msg, setMessage] = useState("");
  const router = useRouter();

  const logOut = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL!}/api/profile`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setProfileData(response.data.data);
        } else {
          setMessage("Unauthorized");
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth error:", error);
        setMessage("Unauthorized");
        router.push("/login");
      }
    };

    fetchProfile();
  }, []);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50 px-6 flex items-center justify-between">
      <Link
        href="/dashboard"
        className="text-xl font-bold tracking-tight text-gray-900"
      >
        LinkedIn Community
      </Link>

      {profileData ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/profile"
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold rounded-full flex items-center justify-center text-lg uppercase shadow-lg ring-2 ring-white"
          >
            {profileData.name?.charAt(0).toUpperCase() || "U"}
          </Link>
          <div className="hidden sm:flex flex-col text-sm font-medium text-gray-700">
            <span>Welcome, {profileData.name}</span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          <button
            onClick={logOut}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="text-sm font-medium text-gray-500">{msg}</div>
      )}
    </nav>
  );
};

export default Navbar;
