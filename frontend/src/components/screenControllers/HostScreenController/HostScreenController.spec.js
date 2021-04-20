import React from 'react';
import { render } from '@testing-library/react';
import { HostContext } from '../../../contexts/HostContext/HostContext';

import HostScreenController from './HostScreenController';

describe('Host screen controller', () => {
  describe('gameState switch', () => {
    describe('default', () => {
      it('throws an error', () => {
        // Prevent writing error in console during this render.
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = jest.fn();

        const dispatch = jest.fn();
        const state = { gameState: '' };

        expect(() =>
          render(
            <HostContext.Provider value={{ state, dispatch }}>
              <HostScreenController />
            </HostContext.Provider>,
          ),
        ).toThrowError();

        // Restore writing to console.
        // eslint-disable-next-line no-console
        console.error = err;
      });
    });
  });
});
