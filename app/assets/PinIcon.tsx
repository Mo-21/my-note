import React from "react";

const PinIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
    className="hover:cursor-pointer"
    {...props}
  >
    <path
      d="M12 2C10.8954 2 10 2.89543 10 4V11C10 12.6569 8.65685 14 7 14H4C2.89543 14 2 14.8954 2 16V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V16C22 14.8954 21.1046 14 20 14H17C15.3431 14 14 12.6569 14 11V4C14 2.89543 13.1046 2 12 2Z"
      fill="currentColor"
      opacity={0.399}
    />
    <path d="M13 11H11V4H13V11Z" fill="currentColor" />
    <path
      d="M17 14.25C17.4142 14.25 17.75 14.5858 17.75 15V16.25H6.25V15C6.25 14.5858 6.58579 14.25 7 14.25H17Z"
      fill="currentColor"
    />
  </svg>
);

export default PinIcon;
