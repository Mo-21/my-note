"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import React from "react";
import { AcmeLogo } from "./assets/AcmeLogo";
import { SearchIcon } from "./assets/SearchIcon";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NavigationBar = () => {
  const router = useRouter();
  const { data } = useSession();

  if (!data || !data.user || !data.user.name) return;

  return (
    <Navbar isBordered>
      <NavbarContent className="justify-between">
        <NavbarBrand className="flex justify-start flex-grow">
          <AcmeLogo height={36} width={36} />
          <p className="hidden sm:block font-bold text-inherit ml-2">My Note</p>
        </NavbarBrand>
        <NavbarItem className="flex justify-center flex-grow">
          <Input
            fullWidth
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem className="flex justify-center flex-grow">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                color="secondary"
                name={data.user.name}
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
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
