"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [msg, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProfileData(response.data.data);
        } else {
          setMessage("Unauthorized");
          router.push("/login");
        }
      } catch (error: any) {
        setMessage("Unauthorized");
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50 px-6 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight text-gray-900">
        LinkedIn Community
      </div>

      {profileData ? (
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold rounded-full flex items-center justify-center text-sm uppercase shadow-lg ring-2 ring-white">
            {profileData.name?.[0] || "U"}
          </div>
          <div className="hidden sm:flex flex-col text-sm font-medium text-gray-700">
            <span>Welcome, {profileData.name}</span>
            <span className="text-xs text-gray-500">
             {`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}{" "}
              {new Date().toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-sm font-medium text-gray-500">{msg}</div>
      )}
    </nav>
  );
};

export default Navbar;
