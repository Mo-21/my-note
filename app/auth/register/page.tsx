"use client";

import { AcmeLogo } from "@/app/assets/AcmeLogo";
import ErrorCallout from "@/app/components/ErrorCallout";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/prisma/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const formSubmit: SubmitHandler<SignUpSchemaType> = async (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    setIsSubmitting(true);
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).finally(() => {
        setIsSubmitting(false);
        router.push("/api/auth/signin");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleBlur = (fieldName: keyof SignUpSchemaType) => () => {
    clearErrors(fieldName);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col items-center gap-3 border-2 border-solid p-20 border-[#27272a] rounded-full"
      >
        <AcmeLogo height={130} width={130} />
        <Input
          type="text"
          placeholder="Name"
          {...register("name")}
          onBlur={handleBlur("name")}
        />
        {errors && errors.name ? (
          <ErrorCallout>{errors.name.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          onBlur={handleBlur("email")}
        />
        {errors && errors.email ? (
          <ErrorCallout>{errors.email.message}</ErrorCallout>
        ) : (
          ""
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          onBlur={handleBlur("password")}
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
          onBlur={handleBlur("passwordConfirmation")}
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default Registration;
