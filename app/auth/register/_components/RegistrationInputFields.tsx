import ErrorCallout from "@/app/components/ErrorCallout";
import { SignUpSchemaType } from "@/prisma/schema/validationSchema";
import { Input } from "@nextui-org/react";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface RegistrationInputFieldsProps {
  handleBlur: (fieldName: keyof SignUpSchemaType) => () => void;
  register: UseFormRegister<SignUpSchemaType>;
  errors: FieldErrors<SignUpSchemaType>;
}

const RegistrationInputFields = ({
  handleBlur,
  register,
  errors,
}: RegistrationInputFieldsProps) => {
  const fields: {
    name: "name" | "email" | "password" | "passwordConfirmation" | "avatar";
    type: string;
    placeholder: string;
    onBlur: () => void;
  }[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      onBlur: handleBlur("name"),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      onBlur: handleBlur("email"),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: handleBlur("password"),
    },
    {
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Confirm Password",
      onBlur: handleBlur("passwordConfirmation"),
    },
  ];

  return fields.map((field) => (
    <>
      <Input
        key={field.placeholder}
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.name)}
        onBlur={field.onBlur}
      />
      {errors && errors[field.name] && (
        <ErrorCallout>{errors[field.name]?.message}</ErrorCallout>
      )}
    </>
  ));
};

export default RegistrationInputFields;
