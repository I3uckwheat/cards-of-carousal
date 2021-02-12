import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('header', () => {
  describe('rendering', () => {
    it('renders a child', () => {
      render(
        <Header>
          <p>Hello World!</p>
        </Header>,
      );
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
    it('renders multiple children', () => {
      render(
        <Header>
          <p>Hello World!</p>
          <p>This is a p tag! </p>
        </Header>,
      );
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
      expect(screen.getByText('This is a p tag!')).toBeInTheDocument();
    });
  });
});
