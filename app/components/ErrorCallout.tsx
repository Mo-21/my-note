"use client";

import { PropsWithChildren } from "react";

const ErrorCallout = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <div>{children}</div>;
};

export default ErrorCallout;
