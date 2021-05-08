import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HeaderFooterLayout from './HeaderFooterLayout';

describe('HeaderFooterLayout', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<HeaderFooterLayout>Test</HeaderFooterLayout>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with the isWelcoming prop', () => {
      const tree = renderer
        .create(<HeaderFooterLayout isWelcoming>Test</HeaderFooterLayout>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders children', () => {
      render(<HeaderFooterLayout>Test</HeaderFooterLayout>);

      expect(screen.getByText('Test')).toBeInTheDocument();

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders when no children are given', () => {
      render(<HeaderFooterLayout />);

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('displays the welcome text when the isWelcoming prop is given', () => {
      render(<HeaderFooterLayout isWelcoming>Test</HeaderFooterLayout>);

      expect(screen.getByTestId('welcome-text')).toBeInTheDocument();
    });

    it('does not display the welcome text when the isWelcoming prop is not given', () => {
      render(<HeaderFooterLayout>Test</HeaderFooterLayout>);

      expect(screen.queryByTestId('welcome-text')).not.toBeInTheDocument();
    });
  });
});
