import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HostProvider from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from './HostPregameScreen';

describe('Host Pregame Screen', () => {
  describe('rendering', () => {
    it('renders', () => {
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      expect(testRender).toMatchSnapshot();
    });

    it('does not change when clicking random elements', () => {
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      fireEvent.click(testRender.getByText('CARDS OF CAROUSAL'));
      fireEvent.click(testRender.getByText('GAME SETTINGS'));
      fireEvent.click(testRender.getByText('JOIN CODE:'));
      fireEvent.click(testRender.getByText('SELECT CARD PACKS'));
      fireEvent.click(
        testRender.getByText(
          'Cards of Carousal is a game for lorem ipsum dolor.',
        ),
      );

      expect(testRender).toMatchSnapshot();
    });
  });

  describe('buttons', () => {
    it('reloads when the close game button is clicked', () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      fireEvent.click(testRender.getByText('CLOSE GAME'));

      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
