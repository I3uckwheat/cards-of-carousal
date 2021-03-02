import React from 'react';
import PropTypes from 'prop-types';
import HostLayout from '../../layouts/HostLayout';

const propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  modal: PropTypes.node.isRequired,
};

export default function Host({ left, right, modal }) {
  return <HostLayout left={left} right={right} modal={modal} />;
}

Host.propTypes = propTypes;
