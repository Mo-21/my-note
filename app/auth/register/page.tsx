"use client";

import { AcmeLogo } from "@/app/assets/AcmeLogo";
import ErrorCallout from "@/app/components/ErrorCallout";
import useRegisterUser from "@/app/hooks/useRegisterUser";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/prisma/schema/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import UploadUserImage from "./_components/UploadUserImage";

const Registration = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { registerUser, isError, isSubmitting } = useRegisterUser();
  const router = useRouter();

  const formSubmit: SubmitHandler<SignUpSchemaType> = async (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    const isSuccess = await registerUser(data);
    if (isSuccess) {
      toast.success("User registered successfully");
      router.push("/api/auth/signin");
    } else if (isError !== null) {
      toast.error(isError);
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

        <UploadUserImage setValue={setValue} />
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
