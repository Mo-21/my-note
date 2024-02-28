"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { AcmeLogo } from "./assets/AcmeLogo";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavbarSkeleton from "./skeletons/NavbarSkeleton";
import defaultImage from "@/app/assets/default.png";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import SearchInput from "./components/SearchInput";

//TODO: Remove DropDown
//TODO: FIX IMPORT STATEMENTS
const NavigationBar = () => {
  const router = useRouter();
  const { data } = useSession();

  if (!data || !data.user || !data.user.name) return <NavbarSkeleton />;

  return (
    <Navbar isBordered>
      <NavbarContent className="justify-between">
        <NavbarBrand className="flex justify-start flex-grow">
          <AcmeLogo height={36} width={36} />
          <p className="hidden sm:block font-bold text-inherit ml-2">My Note</p>
        </NavbarBrand>
        <NavbarItem className="flex justify-center flex-grow">
          <SearchInput />
        </NavbarItem>
        <NavbarItem className="flex justify-center flex-grow">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {data.user.image ? (
                <CldImage
                  width="80"
                  height="80"
                  crop="fill"
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src={data.user.image}
                  alt="user-image"
                />
              ) : (
                <Image
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src={defaultImage}
                  alt="user-image"
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{data.user.name}</p>
              </DropdownItem>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Email</p>
                <p className="font-semibold">{data.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="theme">
                <ThemeSwitch />
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("api/auth/signout");
                }}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
