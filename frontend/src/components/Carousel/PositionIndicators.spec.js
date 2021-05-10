import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PositionIndicators from './PositionIndicators';

describe('PositionIndicators', () => {
  describe('rendering', () => {
    it('renders one indicator button for each slide', () => {
      function TestSlide1() {
        return <p>foo</p>;
      }

      function TestSlide2() {
        return <p>bar</p>;
      }

      function TestSlide3() {
        return <p>baz</p>;
      }

      const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      render(
        <PositionIndicators
          slides={testSlides}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );

      const positionIndicators = screen.getAllByRole('button');

      expect(positionIndicators.length).toBe(3);
    });

    it('renders one black card indicator for the active slide', () => {
      function TestSlide1() {
        return <p>foo</p>;
      }

      function TestSlide2() {
        return <p>bar</p>;
      }

      function TestSlide3() {
        return <p>baz</p>;
      }

      const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      render(
        <PositionIndicators
          slides={testSlides}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );

      const positionIndicators = screen.getAllByAltText(
        'active position indicator',
      );

      expect(positionIndicators.length).toBe(1);
    });

    it('renders one white card indicator for each inactive slide', () => {
      function TestSlide1() {
        return <p>foo</p>;
      }

      function TestSlide2() {
        return <p>bar</p>;
      }

      function TestSlide3() {
        return <p>baz</p>;
      }

      const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      render(
        <PositionIndicators
          slides={testSlides}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );

      const positionIndicators = screen.getAllByAltText(
        'inactive position indicator',
      );

      expect(positionIndicators.length).toBe(2);
    });

    it('renders a black card indicator in the position of the active slide', () => {
      function TestSlide1() {
        return <p>foo</p>;
      }

      function TestSlide2() {
        return <p>bar</p>;
      }

      function TestSlide3() {
        return <p>baz</p>;
      }

      const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      render(
        <PositionIndicators
          slides={testSlides}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );

      const positionIndicators = screen.getAllByRole('img');
      const activePositionIndicator = screen.getByAltText(
        'active position indicator',
      );

      expect(positionIndicators[testCurrentIndex]).toBe(
        activePositionIndicator,
      );
    });
  });

  describe('functionality', () => {
    it('fires the selectThisSlide callback with the index of the clicked indicator', () => {
      function TestSlide1() {
        return <p>foo</p>;
      }

      function TestSlide2() {
        return <p>bar</p>;
      }

      function TestSlide3() {
        return <p>baz</p>;
      }

      const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      render(
        <PositionIndicators
          slides={testSlides}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );

      const positionIndicators = screen.getAllByRole('img');
      userEvent.click(positionIndicators[2]);

      expect(mockSelectThisSlide).toHaveBeenCalledWith(2);
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the slides prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const testCurrentIndex = 0;
      const mockSelectThisSlide = jest.fn();

      expect(() => {
        render(
          <PositionIndicators
            currentIndex={testCurrentIndex}
            selectThisSlide={mockSelectThisSlide}
          />,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  it("logs an error when the slides prop isn't an array", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const testCurrentIndex = 0;
    const mockSelectThisSlide = jest.fn();

    expect(() => {
      render(
        <PositionIndicators
          slides="foo"
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );
    }).toThrow();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when the slides prop is an array of non-nodes', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const testCurrentIndex = 0;
    const mockSelectThisSlide = jest.fn();

    expect(() => {
      render(
        <PositionIndicators
          slides={[() => {}, () => {}]}
          currentIndex={testCurrentIndex}
          selectThisSlide={mockSelectThisSlide}
        />,
      );
    }).toThrow();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the currentIndex prop', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function TestSlide1() {
      return <p>foo</p>;
    }

    function TestSlide2() {
      return <p>bar</p>;
    }

    function TestSlide3() {
      return <p>baz</p>;
    }

    const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
    const mockSelectThisSlide = jest.fn();

    render(
      <PositionIndicators
        slides={testSlides}
        selectThisSlide={mockSelectThisSlide}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("logs an error when the currentIndex prop isn't a number", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function TestSlide1() {
      return <p>foo</p>;
    }

    function TestSlide2() {
      return <p>bar</p>;
    }

    function TestSlide3() {
      return <p>baz</p>;
    }

    const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
    const mockSelectThisSlide = jest.fn();

    render(
      <PositionIndicators
        slides={testSlides}
        currentIndex="foo"
        selectThisSlide={mockSelectThisSlide}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the selectThisSlide prop', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function TestSlide1() {
      return <p>foo</p>;
    }

    function TestSlide2() {
      return <p>bar</p>;
    }

    function TestSlide3() {
      return <p>baz</p>;
    }

    const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
    const testCurrentIndex = 0;

    render(
      <PositionIndicators
        slides={testSlides}
        currentIndex={testCurrentIndex}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("logs an error when the selectThisSlide prop isn't a function", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function TestSlide1() {
      return <p>foo</p>;
    }

    function TestSlide2() {
      return <p>bar</p>;
    }

    function TestSlide3() {
      return <p>baz</p>;
    }

    const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
    const testCurrentIndex = 0;

    render(
      <PositionIndicators
        slides={testSlides}
        currentIndex={testCurrentIndex}
        selectThisSlide="foo"
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('does not log an error when all required props are given correctly', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function TestSlide1() {
      return <p>foo</p>;
    }

    function TestSlide2() {
      return <p>bar</p>;
    }

    function TestSlide3() {
      return <p>baz</p>;
    }

    const testSlides = [<TestSlide1 />, <TestSlide2 />, <TestSlide3 />];
    const testCurrentIndex = 0;
    const mockSelectThisSlide = jest.fn();

    render(
      <PositionIndicators
        slides={testSlides}
        currentIndex={testCurrentIndex}
        selectThisSlide={mockSelectThisSlide}
      />,
    );

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
