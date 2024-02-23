"use client";

import { AcmeLogo } from "@/app/assets/AcmeLogo";
import { Button, Input } from "@nextui-org/react";

const Registration = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form className="flex flex-col items-center gap-3 border-2 border-solid p-20 border-[#27272a] rounded-full">
        <AcmeLogo height={130} width={130} />
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button color="primary" variant="shadow" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Registration;
