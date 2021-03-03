import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

export const HostContext = createContext();

function HostProvider({ children }) {
  return <HostContext.Provider>{children}</HostContext.Provider>;
}

HostProvider.propTypes = propTypes;

export default HostProvider;
