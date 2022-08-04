import React, { memo } from 'react';
import styled from 'styled-components';

interface InputStyledProps {}

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputStyledProps {}

function Input({ width, height, ...rest }: Props) {
  return <StyledInput width={width} height={height} {...rest} />;
}

const StyledInput = styled.input<InputStyledProps>`
  border: 1px solid #d4d2cf;
  border-radius: 4px;
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => height && `${height}px`};
  padding: 4px 8px;
  box-sizing: border-box;
  outline: none;
`;

export default memo(Input);
