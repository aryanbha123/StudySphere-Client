import React from "react";
import { Link, useLocation } from "react-router-dom";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TerminalIcon from "@mui/icons-material/Terminal";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
  { label: "Study", path: "/dashboard/study", icon: <SchoolIcon fontSize="small" /> },
  { label: "Meet", path: "/dashboard/meet", icon: <GroupsIcon fontSize="small" /> },
  { label: "My Notes", path: "/dashboard/notes", icon: <NoteAltIcon fontSize="small" /> },
  { label: "Practice", path: "/dashboard/practice", icon: <FitnessCenterIcon fontSize="small" /> },
  { label: "Playground", path: "/dashboard/playground", icon: <TerminalIcon fontSize="small" /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[230px] bg-[#0d0d0d] text-white shadow-lg p-4">
      <nav className="space-y-2">
        {NAV_ITEMS.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-[#252525]" : "hover:bg-[#252525]"
              }`}
            >
              <span className={`${isActive ? "text-blue-400" : "text-gray-300"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
