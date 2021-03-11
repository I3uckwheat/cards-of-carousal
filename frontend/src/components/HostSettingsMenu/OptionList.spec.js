import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionList from './OptionList';

describe('OptionButton', () => {
  describe('rendering', () => {
    it('renders a button with the given open text when open', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS OPEN' }),
      ).toBeInTheDocument();
    });

    it('renders a button with the given closed text when closed', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen={false}
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS CLOSED' }),
      ).toBeInTheDocument();
    });

    it('does not render the contents of the list when closed', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen={false}
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
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
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
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
            isOpen
            onOptionListClick={() => {}}
            onListItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when not open', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            isOpen={false}
            onOptionListClick={() => {}}
            onListItemClick={() => {}}
            openText="LIST IS OPEN"
            closedText="LIST IS CLOSED"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onOptionListClick callback when the OptionList main button is not clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={consoleSpy}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onOptionListClick callback when the OptionList main button is open and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={consoleSpy}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS OPEN' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('calls the onOptionListClick callback when the OptionList main button is closed and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen={false}
          onOptionListClick={consoleSpy}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS CLOSED' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not call the onListItemClick callback if none of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('does not call the onListItemClick callback if none of the list item buttons are clicked but the main button is', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS OPEN' }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onListItemClick callback once each time any of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={consoleSpy}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'foo' }));
      userEvent.click(screen.getByRole('button', { name: 'bash' }));
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    it('calls the onListItemClick callback multiple times if a list item is clicked multiple times', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={consoleSpy}
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
            isOpen
            onOptionListClick={() => {}}
            onListItemClick={() => {}}
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
            isOpen
            onOptionListClick={() => {}}
            onListItemClick={() => {}}
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
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the isOpen prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isOpen prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen="baz"
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onOptionListClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onOptionListClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={false}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onListItemClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onListItemClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={false}
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
          isOpen
          onListItemClick={() => {}}
          onOptionListClick={() => {}}
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
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
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
          isOpen
          onListItemClick={() => {}}
          onOptionListClick={() => {}}
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
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
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
          isOpen
          onOptionListClick={() => {}}
          onListItemClick={() => {}}
          openText="LIST IS OPEN"
          closedText="LIST IS CLOSED"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
