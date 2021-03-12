import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import CardHandLayout from './CardHandLayout';

describe('CardHandLayout', () => {
  describe('rendering', () => {
    it('renders the submit button', () => {
      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(
        screen.getByRole('button', { name: 'SUBMIT' }),
      ).toBeInTheDocument();
    });

    it('renders the clear button', () => {
      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(screen.getByRole('button', { name: 'CLEAR' })).toBeInTheDocument();
    });

    it('renders the title', () => {
      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          <p>child1</p>
          <p>child2</p>
        </CardHandLayout>,
      );

      expect(screen.getByText('child1')).toBeInTheDocument();
      expect(screen.getByText('child2')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      const tree = renderer
        .create(
          <CardHandLayout
            title={{ top: 'test', bottom: 'bar' }}
            onSubmit={() => {}}
            onClear={() => {}}
          >
            FOO
          </CardHandLayout>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onSubmit callback when the SUBMIT button is not clicked', () => {
      const mockSubmit = jest.fn();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={mockSubmit}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(mockSubmit).not.toHaveBeenCalledTimes(1);
    });

    it('calls the onSubmit callback when the SUBMIT button is clicked', () => {
      const mockSubmit = jest.fn();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={mockSubmit}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not call the onClear callback when the CLEAR button is not clicked', () => {
      const mockClear = jest.fn();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={mockClear}
        >
          FOO
        </CardHandLayout>,
      );

      expect(mockClear).not.toHaveBeenCalledTimes(1);
    });

    it('calls the onClear callback when the CLEAR button is clicked', () => {
      const mockClear = jest.fn();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
          onClear={mockClear}
        >
          FOO
        </CardHandLayout>,
      );

      userEvent.click(screen.getByRole('button', { name: 'CLEAR' }));
      expect(mockClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('propTypes', () => {
    it('logs an error when onClear is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onSubmit={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onClear is not a function', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onClear="Not a function"
          onSubmit={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onSubmit is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when onSubmit is not a function', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'test', bottom: 'bar' }}
          onClear={() => {}}
          onSubmit="Not a function"
        >
          FOO
        </CardHandLayout>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when title is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(
          <CardHandLayout onClear={() => {}} onSubmit={() => {}}>
            FOO
          </CardHandLayout>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.top is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ bottom: 'string' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.bottom is not included', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'string' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.top is not passed a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 10, bottom: 'string' }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if title.bottom is not passed a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'string', bottom: 10 }}
          onSubmit={() => {}}
          onClear={() => {}}
        >
          FOO
        </CardHandLayout>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error if children are not passed in', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <CardHandLayout
          title={{ top: 'line1', bottom: 'string' }}
          onSubmit={() => {}}
          onClear={() => {}}
        />,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
