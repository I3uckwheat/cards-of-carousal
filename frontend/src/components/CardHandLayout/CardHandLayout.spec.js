import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import CardHandLayout from './CardHandLayout';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

describe('CardHandLayout', () => {
  describe('rendering', () => {
    it('renders the submit button', () => {
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(
        screen.getByRole('button', { name: 'SUBMIT' }),
      ).toBeInTheDocument();
    });

    it('renders the clear button', () => {
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(screen.getByRole('button', { name: 'CLEAR' })).toBeInTheDocument();
    });

    it('renders the title', () => {
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('renders children', () => {
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            <p>child1</p>
            <p>child2</p>
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('child1')).toBeInTheDocument();
      expect(screen.getByText('child2')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      const state = { selectCardCount: 1 };

      const tree = renderer
        .create(
          <PlayerContext.Provider value={{ state }}>
            <CardHandLayout
              title={{ top: 'test', bottom: 'bar' }}
              onSubmit={() => {}}
              onClear={() => {}}
              numberSelected={1}
            >
              FOO
            </CardHandLayout>
            ,
          </PlayerContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onSubmit callback when the SUBMIT button is not clicked', () => {
      const mockSubmit = jest.fn();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={mockSubmit}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(mockSubmit).not.toHaveBeenCalledTimes(1);
    });

    it('calls the onSubmit callback when the SUBMIT button is clicked', () => {
      const mockSubmit = jest.fn();
      const state = { selectCardCount: 2 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={mockSubmit}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      userEvent.click(screen.getByTestId('submit'));
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('does not call the onSubmit callback if the submit button is pressed and there are not enough cards selected', () => {
      const mockSubmit = jest.fn();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={mockSubmit}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not call the onClear callback when the CLEAR button is not clicked', () => {
      const mockClear = jest.fn();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={mockClear}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(mockClear).not.toHaveBeenCalledTimes(1);
    });

    it('calls the onClear callback when the CLEAR button is clicked', () => {
      const mockClear = jest.fn();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={mockClear}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'CLEAR' }));
      expect(mockClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('propTypes', () => {
    it('logs an error when onClear is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onClear is not a function', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onClear="Not a function"
            onSubmit={() => {}}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onSubmit is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onSubmit is not a function', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onClear={() => {}}
            numberSelected={1}
            onSubmit="Not a function"
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when title is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      expect(() => {
        render(
          <PlayerContext.Provider value={{ state }}>
            <CardHandLayout
              onClear={() => {}}
              numberSelected={1}
              onSubmit={() => {}}
            >
              FOO
            </CardHandLayout>
            ,
          </PlayerContext.Provider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.top is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ bottom: 'string' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.bottom is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'string' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.top is not passed a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 10, bottom: 'string' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.bottom is not passed a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'string', bottom: 10 }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          >
            FOO
          </CardHandLayout>
          ,
        </PlayerContext.Provider>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if children are not passed in', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const state = { selectCardCount: 1 };

      render(
        <PlayerContext.Provider value={{ state }}>
          <CardHandLayout
            title={{ top: 'line1', bottom: 'string' }}
            onSubmit={() => {}}
            onClear={() => {}}
            numberSelected={1}
          />
          ,
        </PlayerContext.Provider>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
