import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./assets/AcmeLogo";
import SearchInput from "./components/SearchInput";
import NavbarDropdown from "./components/NavbarDropdown";
import { getServerSession } from "next-auth/next";

const NavigationBar = async () => {
  const session = await getServerSession();
  if (!session || !session.user?.email) return;

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
          <NavbarDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
