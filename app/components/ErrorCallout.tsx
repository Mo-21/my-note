"use client";

import { PropsWithChildren } from "react";

const ErrorCallout = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <div className="text-xs text-red-500 mt-2">{children}</div>;
};

export default ErrorCallout;
