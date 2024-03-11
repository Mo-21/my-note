import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";

const NavbarSkeleton = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <Skeleton className="h-3 w-3/5 rounded-lg" />
        </DropdownItem>
        <DropdownItem key="email" className="h-14 gap-2">
          <p className="font-semibold">Email</p>
          <Skeleton className="h-3 w-3/5 rounded-lg" />
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarSkeleton;
