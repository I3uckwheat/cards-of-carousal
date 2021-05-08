import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel';

describe('Carousel', () => {
  describe('rendering', () => {
    it('renders only the first component on load', () => {
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
      const testInterval = 3000;

      render(<Carousel slides={testSlides} interval={testInterval} />);

      expect(screen.getByText('foo')).toBeTruthy();
      expect(screen.queryByText('bar')).toBeFalsy();
      expect(screen.queryByText('baz')).toBeFalsy();
    });

    it('renders only the second component after the interval has passed once', () => {
      jest.useFakeTimers();

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
      const testInterval = 3000;

      render(<Carousel slides={testSlides} interval={testInterval} />);

      act(() => {
        jest.advanceTimersByTime(testInterval);
      });

      expect(screen.queryByText('foo')).toBeFalsy();
      expect(screen.getByText('bar')).toBeTruthy();
      expect(screen.queryByText('baz')).toBeFalsy();
    });
  });

  describe('functionality', () => {
    it('clicking one of the position indicators switches the carousel to that slide', () => {
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
      const testInterval = 3000;

      render(<Carousel slides={testSlides} interval={testInterval} />);

      const positionIndicators = screen.getAllByRole('button');

      userEvent.click(positionIndicators[2]);

      expect(screen.queryByText('foo')).toBeFalsy();
      expect(screen.queryByText('bar')).toBeFalsy();
      expect(screen.getByText('baz')).toBeTruthy();
    });

    it('stops autorotation of the carousel after a slide has been manually selected', () => {
      jest.useFakeTimers();

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
      const testInterval = 3000;

      render(<Carousel slides={testSlides} interval={testInterval} />);

      const positionIndicators = screen.getAllByRole('button');

      userEvent.click(positionIndicators[2]);

      act(() => {
        jest.advanceTimersByTime(testInterval);
      });

      expect(screen.queryByText('foo')).toBeFalsy();
      expect(screen.queryByText('bar')).toBeFalsy();
      expect(screen.getByText('baz')).toBeTruthy();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the slides prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const testInterval = 3000;

      expect(() => {
        render(<Carousel interval={testInterval} />);
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when the slides prop isn't an array", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const testInterval = 3000;

      expect(() => {
        render(<Carousel slides="foo" interval={testInterval} />);
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when the slides prop is an array of non-nodes', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const testInterval = 3000;

      expect(() => {
        render(
          <Carousel slides={['foo', 'bar', 'baz']} interval={testInterval} />,
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

      render(<Carousel slides={testSlides} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when the interval prop isn't a number", () => {
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

      render(<Carousel slides={testSlides} interval="foo" />);

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
      const testInterval = 3000;

      render(<Carousel slides={testSlides} interval={testInterval} />);

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
