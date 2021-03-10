import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionList from './OptionList';

describe('OptionButton', () => {
  describe('rendering', () => {
    it('renders a button with the given active text when active', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS ACTIVE' }),
      ).toBeInTheDocument();
    });

    it('renders a button with the given inactive text when inactive', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive={false}
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(
        screen.getByRole('button', { name: 'LIST IS INACTIVE' }),
      ).toBeInTheDocument();
    });

    it('does not render the contents of the list when inactive', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive={false}
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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

    it('renders the content of the list when active', () => {
      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(screen.getByRole('button', { name: 'foo' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'bar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'bash' })).toBeInTheDocument();
    });

    it('matches the expected snapshot when active', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            isActive
            onAccordionClick={() => {}}
            onListItemClick={() => {}}
            activeText="LIST IS ACTIVE"
            inactiveText="LIST IS INACTIVE"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when not active', () => {
      const tree = renderer
        .create(
          <OptionList
            listContent={['foo', 'bar', 'bash']}
            isActive={false}
            onAccordionClick={() => {}}
            onListItemClick={() => {}}
            activeText="LIST IS ACTIVE"
            inactiveText="LIST IS INACTIVE"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onAccordionClick callback when the OptionList main button is not clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={consoleSpy}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onAccordionClick callback when the OptionList main button is active and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={consoleSpy}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS ACTIVE' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('calls the onAccordionClick callback when the OptionList main button is inactive and is clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive={false}
          onAccordionClick={consoleSpy}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS INACTIVE' }));
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not call the onListItemClick callback if none of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={consoleSpy}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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
          isActive
          onAccordionClick={() => {}}
          onListItemClick={consoleSpy}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'LIST IS ACTIVE' }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('calls the onListItemClick callback once each time any of the list item buttons are clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={consoleSpy}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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
          isActive
          onAccordionClick={() => {}}
          onListItemClick={consoleSpy}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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
            isActive
            onAccordionClick={() => {}}
            onListItemClick={() => {}}
            activeText="LIST IS ACTIVE"
            inactiveText="LIST IS INACTIVE"
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
            isActive
            onAccordionClick={() => {}}
            onListItemClick={() => {}}
            activeText="LIST IS ACTIVE"
            inactiveText="LIST IS INACTIVE"
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
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the isActive prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isActive prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive="baz"
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onAccordionClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onAccordionClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={false}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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
          isActive
          onAccordionClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
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
          isActive
          onAccordionClick={() => {}}
          onListItemClick={false}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the activeText prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onListItemClick={() => {}}
          onAccordionClick={() => {}}
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the activeText prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText={false}
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the inactiveText prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onListItemClick={() => {}}
          onAccordionClick={() => {}}
          activeText="LIST IS ACTIVE"
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the inactiveText prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionList
          listContent={['foo', 'bar', 'bash']}
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText={false}
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
          isActive
          onAccordionClick={() => {}}
          onListItemClick={() => {}}
          activeText="LIST IS ACTIVE"
          inactiveText="LIST IS INACTIVE"
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
