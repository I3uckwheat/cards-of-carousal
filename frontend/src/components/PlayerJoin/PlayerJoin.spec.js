import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PlayerJoin from './PlayerJoin';

describe('PlayerJoin', () => {
  describe('render', () => {
    it('should render', () => {
      render(<PlayerJoin />);

      expect(screen.getByTestId('player-join-container')).toBeInTheDocument();
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const tree = renderer.create(<PlayerJoin />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
