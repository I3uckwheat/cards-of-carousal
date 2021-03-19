/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CzarHandScreen from './CzarHandScreen';
import {
  PlayerContext,
  PlayerProvider,
} from '../../../contexts/PlayerContext/PlayerContext';

describe('CzarHandScreen', () => {
  describe('render', () => {
    it('should render', () => {
      render(
        <PlayerProvider>
          <CzarHandScreen />
        </PlayerProvider>,
      );

      expect(screen.getByText("YOU'RE THE CZAR")).toBeInTheDocument();
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const tree = renderer
        .create(
          <PlayerProvider>
            <CzarHandScreen />
          </PlayerProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
