import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      
      {/* This is where nested pages will render */}
      <div style={{ backgroundColor:"#f5f5f5", marginLeft: "230px",minHeight:"100vh", padding: "20px" , paddingTop:"80px"}}>
        <Outlet />
      </div>
    </>
  );
}
