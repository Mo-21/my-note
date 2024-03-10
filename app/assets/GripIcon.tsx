import React from "react";

const GripIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
    className="hover:cursor-pointer"
    {...props}
  >
    <g fill="currentColor">
      <circle cx="9" cy="7" r="2" />
      <circle cx="9" cy="13" r="2" />
      <circle cx="9" cy="19" r="2" />

      <circle cx="17" cy="7" r="2" />
      <circle cx="17" cy="13" r="2" />
      <circle cx="17" cy="19" r="2" />
    </g>
  </svg>
);

export default GripIcon;
