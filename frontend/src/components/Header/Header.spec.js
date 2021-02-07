import Header from './Header';
import { render, screen } from '@testing-library/react';

describe('header', () => {
  describe('rendering', () => {
    it('renders a child', () => {
      render(
        <Header>
          <p>Hello World!</p>
        </Header>
      )
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    })
    it('renders multiple children', () => {
      render(
        <Header>
          <p>Hello World!</p>
          <p>This is a p tag! </p>
        </Header>
      )
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
      expect(screen.getByText('This is a p tag!')).toBeInTheDocument();
    });
  })
})