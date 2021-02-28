import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PlayerJoinScreen from './PlayerJoinScreen';

describe('PlayerJoin', () => {
  describe('render', () => {
    it('should render', () => {
      render(<PlayerJoinScreen />);

      expect(screen.getByTestId('player-join-container')).toBeInTheDocument();
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const tree = renderer.create(<PlayerJoinScreen />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
