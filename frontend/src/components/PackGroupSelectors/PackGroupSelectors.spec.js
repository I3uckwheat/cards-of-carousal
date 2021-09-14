import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PackGroupSelectors from './PackGroupSelectors';

describe('PackGroupSelectors', () => {
  describe('rendering', () => {
    it('renders the SFW pack selector button', () => {
      const onChange = () => {};
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(
        screen.getByRole('button', { name: 'SFW Only' }),
      ).toBeInTheDocument();
    });

    it('renders the Reset packs selector button', () => {
      const onChange = () => {};
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('calls onChange callback with selectedPacks updated to include only pack 94 when "SFW Only" is clicked', () => {
      const onChange = jest.fn();
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };
      const finalSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [94],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      userEvent.click(screen.getByRole('button', { name: 'SFW Only' }));

      expect(onChange).toHaveBeenCalledWith(finalSettings);
    });

    it('calls onChange callback with selectedPacks updated to include only pack 0 when "Reset" is clicked', () => {
      const onChange = jest.fn();
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [1, 2, 8],
      };
      const finalSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      userEvent.click(screen.getByRole('button', { name: 'Reset' }));

      expect(onChange).toHaveBeenCalledWith(finalSettings);
    });

    it("doesn't call the onChange callback when none of its buttons are clicked", () => {
      const onChange = jest.fn();
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when not given the onChange prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(<PackGroupSelectors options={initialSettings} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given an onChange prop that isn't a function", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when not given the options prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = () => {};

      render(<PackGroupSelectors onChange={onChange} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given an options prop without a maxPlayers property', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given an options prop without a winningScore property', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given an options prop without a selectedPacks property', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given an options prop with a maxPlayers property that isn't a number", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: false,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given an options prop with a winningScore property that isn't a number", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: false,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given an options prop with a selectedPacks property that isn't an array", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: false,
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given an options prop with a selectedPacks array which doesn't contain numbers", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [false],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("doesn't log an error when given all of the correct props", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const onChange = false;
      const initialSettings = {
        maxPlayers: 10,
        winningScore: 10,
        selectedPacks: [0],
      };

      render(
        <PackGroupSelectors onChange={onChange} options={initialSettings} />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
