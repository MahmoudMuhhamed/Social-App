import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
  User,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { div } from "framer-motion/client";
import { LuHouse } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useIsFetching, useQuery } from '@tanstack/react-query';
import Loader from "../loader/Loader";
import { useUser } from "../UserContext/UserContext";




export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Feed",
    "Profile",
    "Notifications",
  ];

  const { userData, isLoading, isError, error, data } = useUser();




  

    if (isLoading) {
      return <Loader />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }




  
  return (
    <Navbar className="h-14 lg:px-25" maxWidth="full">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand as="div" >
        <img className="w-9 rounded-xl  me-2.5" src="https://route-posts.routemisr.com/route.png" alt="logo" />
        <p className="font-bold text-xl text-inherit">Route Posts</p>
      </NavbarBrand>

      <NavbarContent as="div" data-justify="between" className="hidden sm:flex rounded-2xl border-gray-200 bg-gray-100 border pt-1.5 gap-6 h-11.5 px-5" >
        <NavbarItem isActive>
          <Link className="text-gray-600 inline-flex active:text-blue-500 hover:text-black font-bold text-sm"  to="/home">
            <LuHouse className="me-2 text-xl"/> Feed
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link className="text-gray-600 inline-flex active:text-blue-500 hover:text-black font-bold text-sm"  to="/profile">
            < LuUser className="me-2 text-xl"/> Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 inline-flex active:text-blue-500 hover:text-black font-bold text-sm" to="/notification">
            <LuMessageCircle className="me-2 text-xl"/> Notifications
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" as="div">
        <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              size:'sm',
              src: userData?.photo,
            }}
            className="transition-transform font-semibold border-gray-200 rounded-3xl bg-gray-100 border py-1.5  px-4 cursor-pointer"
            name={userData?.name}
          />
        </DropdownTrigger>
        
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" >
            <Link to="/Profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="">
            <Link to="/Setting">Setting</Link>
          </DropdownItem>
          <DropdownItem key="logout" className="text-danger" color="danger">
            <Link to="/login">Log Out</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </NavbarContent>

        <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              to={`/${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>

  );
}
