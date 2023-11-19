import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const LogoAnimate = keyframes`
  0%, 100% {
    transform: scaleY(0.98);
    opacity: 0.5;
  } 50% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const StyledLoaderWrapper = styled.div`
  margin: ${(props) => props.margin};
  animation: ${LogoAnimate} 1.5s linear infinite;
`;

export function LoaderSVG ({width, height, color, ref}) {
  return (
    <svg ref={ref} width={width} height={height} viewBox="0 0 152 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}>
        <path d="M38.1419 1.21279C38.2881 0.542986 38.9625 0 39.6481 0H73.1654C73.851 0 74.2881 0.542986 74.1419 1.21279L66.9902 33.9582C66.844 34.628 66.1696 35.171 65.484 35.171H31.9667C31.2812 35.171 30.844 34.628 30.9902 33.9582L38.1419 1.21279Z" fill={color} />
        <path d="M81.5901 1.21279C81.7364 0.542986 82.4108 0 83.0964 0H138.958C147.186 0 152.432 6.51583 150.677 14.5535L131.076 104.3C130.929 104.97 130.255 105.513 129.57 105.513H97.8079C97.1223 105.513 96.4479 106.056 96.3016 106.726L89.15 139.471C89.0037 140.141 89.4409 140.684 90.1265 140.684H121.888C122.574 140.684 123.011 141.227 122.865 141.897L115.713 174.642C115.567 175.312 114.892 175.855 114.207 175.855H80.6895C80.004 175.855 79.5667 175.312 79.713 174.642L86.8647 141.897C87.0109 141.227 86.5738 140.684 85.8882 140.684H52.3709C51.6853 140.684 51.2481 140.141 51.3944 139.471L58.546 106.726C58.6923 106.056 59.3667 105.513 60.0523 105.513H93.5695C94.2551 105.513 94.9295 104.97 95.0758 104.3L108.584 42.4477C109.462 38.4289 106.839 35.171 102.725 35.171H75.415C74.7294 35.171 74.2922 34.628 74.4385 33.9582L81.5901 1.21279Z" fill={color} />
        <path d="M30.3775 42.4477C29.6919 42.4477 29.0175 42.9907 28.8712 43.6605L0.264753 174.642C0.118464 175.312 0.555663 175.855 1.24126 175.855H34.7585C35.4441 175.855 36.1185 175.312 36.2648 174.642L64.8712 43.6605C65.0175 42.9907 64.5803 42.4477 63.8947 42.4477H30.3775Z" fill={color} />
      </g>
    </svg>
  );
}
const Loader = React.forwardRef(function Loader (props, ref) {
  const { height, width, margin, color } = props;
  return (
  <StyledLoaderWrapper margin={margin}>
    <LoaderSVG height={height} width={width} color={color} ref={ref}  />
  </StyledLoaderWrapper>

  );
});

Loader.defaultProps = {
  height: 100,
  width: 100,
  margin: 'auto',
  color: 'gray'
};

Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.string,
  color: PropTypes.string
};

export default Loader;
