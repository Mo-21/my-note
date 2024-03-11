"use client";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavbarSkeleton from "../skeletons/NavbarSkeleton";
import ThemeSwitch from "../ThemeSwitch";
import defaultImage from "@/app/assets/default.png";

const NavbarDropdown = () => {
  const router = useRouter();
  const { data } = useSession();

  if (!data || !data.user || !data.user.name) return <NavbarSkeleton />;
  return (
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
            priority={true}
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
        <DropdownItem key="email" className="h-14 gap-2">
          <p className="font-semibold">Email</p>
          <p className="font-semibold">{data.user.email}</p>
        </DropdownItem>
        <DropdownItem textValue="Change Theme" key="theme">
          <ThemeSwitch />
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
  );
};

export default NavbarDropdown;
