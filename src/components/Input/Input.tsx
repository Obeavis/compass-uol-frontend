import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Input: FC<Props> = ({ name, error, icon, className, ...rest }) => {
  return (
    <label
      className={`w-full flex items-center gap-3 ${className}`}
      htmlFor={name}
    >
      <input
        className={`rounded-full border bg-transparent text-white w-full px-3 py-2 ${
          error ? "border-secondary" : "border-gray-200"
        }`}
        id={name}
        {...rest}
      />
      {icon}
    </label>
  );
};

export default Input;
