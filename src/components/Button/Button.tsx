import React, { FC } from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  outline: none !important;
  border: none;
  &:active {
    transform: translateY(2px);
  }
`;

export interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

export const Button: FC<Props> = ({ className, ...rest }) => {
  return (
    <div className="w-full">
      <StyledButton className={`w-full text-gray-200 py-3 text-sm ${className}`} {...rest} />
    </div>
  );
};

export default Button;
