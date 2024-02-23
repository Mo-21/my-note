"use client";

import { AcmeLogo } from "@/app/assets/AcmeLogo";
import ErrorCallout from "@/app/components/ErrorCallout";
import { signUpSchema, SignUpSchemaType } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const formSubmit: SubmitHandler<SignUpSchemaType> = (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    console.log({ data });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col items-center gap-3 border-2 border-solid p-20 border-[#27272a] rounded-full"
      >
        <AcmeLogo height={130} width={130} />
        <Input type="text" placeholder="Name" {...register("name")} />
        {errors && errors.name ? (
          <ErrorCallout>{errors.name.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Input type="email" placeholder="Email" {...register("email")} />
        {errors && errors.email ? (
          <ErrorCallout>{errors.email.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors && errors.password ? (
          <ErrorCallout>{errors.password.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("passwordConfirmation")}
        />
        {errors && errors.passwordConfirmation ? (
          <ErrorCallout>{errors.passwordConfirmation.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Button
          type="submit"
          color="primary"
          variant="shadow"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Registration;
