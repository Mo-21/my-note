import {
  Navbar,
  Input,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";
import { AcmeLogo } from "./assets/AcmeLogo";
import { SearchIcon } from "./assets/SearchIcon";

const NavbarSkeleton = () => {
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
              <Skeleton className="flex rounded-full w-12 h-12" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              </DropdownItem>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Email</p>
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="theme">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarSkeleton;
