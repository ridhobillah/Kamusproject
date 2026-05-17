import { Navbar, NavbarBrand, Button } from "flowbite-react";
import logo from "../assets/logonav.png";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function NavbarComp() {
  return (
    <Navbar style={{background: "#0F2027"}}>
      <NavbarBrand href="/">
        <img
          src={logo}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
          height="30"
        />
      </NavbarBrand>



      <Link to="/translate">
      <Button className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800">
        Get started
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>

      </Link>
    </Navbar>
  );
}
