import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";

export default function Template() {
  return (
    <>
            <NavbarComp />
            {/* */}
            <Outlet /> {/* kalo di laravel yeild */}
            <FooterComp/>   
    </>
  );
}
