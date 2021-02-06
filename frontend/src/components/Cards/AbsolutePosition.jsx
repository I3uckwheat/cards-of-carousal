import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AbsoluteDiv = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function AbsolutePosition({
  top, right, bottom, left, width, height, children,
}) {
  return (
    <AbsoluteDiv
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={width}
      height={height}
    >
      {children}
    </AbsoluteDiv>
  );
}
AbsolutePosition.defaultProps = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  width: 'auto',
  height: 'auto',
};
AbsolutePosition.propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default AbsolutePosition;
