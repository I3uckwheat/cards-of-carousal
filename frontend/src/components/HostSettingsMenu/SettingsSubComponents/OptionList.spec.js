import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionList from './OptionList';

describe('OptionList', () => {
  describe('rendering', () => {
    it('renders a button with the given open text when open', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS OPEN' }),
      ).toBeInTheDocument();
    });

    it('renders a button with the given closed text when enabled', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="enabled"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS CLOSED' }),
      ).toBeInTheDocument();
    });

    it('does not render the contents of the list when enabled', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="enabled"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.queryByRole('button', { name: 'foo' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'bar' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'bash' }),
      ).not.toBeInTheDocument();
    });

    it('renders a button with the given closed text when disabled', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="disabled"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS CLOSED' }),
      ).toBeInTheDocument();
    });

    it('does not render the contents of the list when disabled', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="disabled"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.queryByRole('button', { name: 'foo' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'bar' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'bash' }),
      ).not.toBeInTheDocument();
    });

    it('renders the content of the list when open', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(screen.getByRole('button', { name: 'foo' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'bar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'bash' })).toBeInTheDocument();
    });

    it('matches the expected snapshot when open', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            state="open"
            onClick={() => {}}
            onItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when enabled', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            state="enabled"
            onClick={() => {}}
            onItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when disabled', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            state="disabled"
            onClick={() => {}}
            onItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onClick callback when the OptionList main button is not clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={consoleSpy}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onClick callback when the OptionList main button is open and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={consoleSpy}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS OPEN' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('calls the onClick callback when the OptionList main button is closed and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="enabled"
          onClick={consoleSpy}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS CLOSED' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not call the onItemClick callback if none of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('does not call the onItemClick callback if none of the list item buttons are clicked but the main button is', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS OPEN' }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onItemClick callback once each time any of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'foo' }));
      userEvent.click(screen.getByRole('button', { name: 'bash' }));
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    it('calls the onItemClick callback multiple times if a list item is clicked multiple times', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'foo' }));
      userEvent.click(screen.getByRole('button', { name: 'foo' }));
      userEvent.click(screen.getByRole('button', { name: 'bash' }));
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the listContent prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <OptionList
            state="open"
            onClick={() => {}}
            onItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        );
      }).toThrow();
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the listContent prop as a non array', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <OptionList
            listContent="foo"
            state="open"
            onClick={() => {}}
            onItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        );
      }).toThrow();
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the listContent prop as an array of non strings', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={[true, false, true]}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the state prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the state prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state={false}
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={false}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onItemClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onItemClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={false}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the openText prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onItemClick={() => {}}
          onClick={() => {}}
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the openText prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText={false}
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the closedText prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onItemClick={() => {}}
          onClick={() => {}}
          openText="LIST IS OPEN"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the closedText prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText={false}
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log any error when all of the needed props are provided', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          state="open"
          onClick={() => {}}
          onItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
