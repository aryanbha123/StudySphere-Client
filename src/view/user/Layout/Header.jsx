import React from "react";
import Notification from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-white shadow flex items-center justify-between px-6 z-50">
        <div>
            {/* Title */}
            <Link to="/">
                <img src="/logo.png" className="h-10" alt="" />
            </Link>
        </div>
        <div className="flex gap-4 text-gray-700">
            {/* Notifications */}
            <div className="relative ">
                <button className="p-2 cursor-pointer">
                    <Notification />
                </button>
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            {/* Profile */}
            <div className="relative ">
                <button className="p-2 cursor-pointer">
                    <LogoutIcon />
                </button>
            </div>
        </div>
    </header>
  );
}
