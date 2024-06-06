import React from "react";
import Navbar from "../navbaer/Navbar";
import Footer from "../footer/Footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main-content min-h-[84vh]">{children}</div>
  
      <Footer />
    </div>
  );
};

export default Layout;
