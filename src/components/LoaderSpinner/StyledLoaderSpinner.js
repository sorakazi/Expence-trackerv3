import React from "react";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the triangle spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define the styled component for the triangle spinner
const TriangleSpinner = styled.div`
  display: inline-block;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "80px"};
  position: relative;
  animation: ${spin} 2s linear infinite;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: ${(props) => `calc(${props.width} / 2)` || "40px"} solid
      transparent;
    border-right: ${(props) => `calc(${props.width} / 2)` || "40px"} solid
      transparent;
    border-bottom: ${(props) => props.height || "80px"} solid
      ${(props) => props.color || "#4fa94d"};
    top: 0;
    left: 0;
  }
`;

const Triangle = ({
  visible,
  height,
  width,
  color,
  ariaLabel,
  wrapperStyle,
  wrapperClass,
}) => {
  if (!visible) return null;

  return (
    <div style={wrapperStyle} className={wrapperClass} aria-label={ariaLabel}>
      <TriangleSpinner height={height} width={width} color={color} />
    </div>
  );
};

export default Triangle;
