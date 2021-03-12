import React from 'react';
import HostLayout from '../components/layouts/HostLayout';

export default function HostScreenExample() {
  return (
    <HostLayout left={<p>left</p>} right={<p>right</p>} modal={<p>modal</p>} />
  );
}
