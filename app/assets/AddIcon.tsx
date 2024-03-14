import React from "react";

const AddIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
    className="hover:cursor-pointer text-xl text-default-500 pointer-events-none flex-shrink-0"
    {...props}
  >
    <path
      opacity="0.6"
      d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
      fill="currentColor"
    />
    <path
      d="M14.5 9.89996H12.75V8.20996C12.75 7.79996 12.41 7.45996 12 7.45996C11.59 7.45996 11.25 7.79996 11.25 8.20996V9.89996H9.5C9.09 9.89996 8.75 10.24 8.75 10.65C8.75 11.06 9.09 11.4 9.5 11.4H11.25V13.21C11.25 13.62 11.59 13.96 12 13.96C12.41 13.96 12.75 13.62 12.75 13.21V11.4H14.5C14.91 11.4 15.25 11.06 15.25 10.65C15.25 10.24 14.91 9.89996 14.5 9.89996Z"
      fill="black"
    />
  </svg>
);

export default AddIcon;
