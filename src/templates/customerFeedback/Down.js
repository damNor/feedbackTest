import React from "react";
import cx from "classnames";

const Down = ({ isOpen }) => {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7.5L1 14"
        stroke="#0072BC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
Down.defaultProps = {};
export default Down;
