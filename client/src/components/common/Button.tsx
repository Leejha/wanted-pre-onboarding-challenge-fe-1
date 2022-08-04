import React, { memo, ReactNode } from 'react';

import styled, { css } from 'styled-components';

interface ButtonStyledProps {
  width?: number;
  height?: number;
  variant?: 'primary' | 'secondary';
}

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyledProps {
  children: ReactNode;
}

function Button({ children, ...rest }: Props) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

const StyledButton = styled.button<ButtonStyledProps>`
  ${({ width = 70, height = 30 }) => css`
    width: ${width}px;
    height: ${height}px;
  `}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          color: white;
          background: #4848e9;
          border: none;
        `;

      case 'secondary':
        return css`
          color: #4848e9;
          background: white;
          border: 1px solid #4848e9;
        `;
    }
  }}
`;

export default memo(Button);
