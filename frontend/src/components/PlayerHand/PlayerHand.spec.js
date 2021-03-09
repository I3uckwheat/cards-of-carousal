import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import PlayerHand from './PlayerHand';

describe('PlayerHand', () => {
  it('fires the onSelect callback when a card is touched', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onClick = jest.fn();

    render(<PlayerHand cards={whiteCards} selected={[]} onSelect={onClick} />);

    userEvent.click(screen.getByText('Briggs'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // make sure the index of clicked card is being used in onSelect
  it('fires the onSelect callback with the index of the clicked card', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onSelectMock = jest.fn(); // onSelect={([selected indexes]) => setSelectedCards([selected indexes])}  mocking the callback (not really setting state here)
    // selected array is being used in mock  // onClick with a paramter
    render(
      <PlayerHand cards={whiteCards} selected={[]} onSelect={onSelectMock} />,
    );

    userEvent.click(screen.getByText('Bender')); // looks for bender, and then clicks it which fires mock (handle click which calls onSelect)
    expect(onSelectMock).toHaveBeenCalledWith([1]); // mock is being called with my [selected] as the paramter
  });

  it('fires onSelect callback with the indexes of multiple clicked cards', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onSelectMock = jest.fn();

    render(
      <PlayerHand cards={whiteCards} selected={[]} onSelect={onSelectMock} />,
    );

    userEvent.click(screen.getByText('Bender'));
    userEvent.click(screen.getByText('hi'));

    expect(onSelectMock).toHaveBeenCalledWith([3]);
    expect(onSelectMock).toHaveBeenCalledWith([1]);
  });

  // test with selected value in selected , test adding and removing

  // --------------------------------------------------------------------------
  // PropType Testing
  it('does not log an error when the required props are provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand
        cards={['card1', 'card2', 'card3']}
        selected={[0, 1]}
        onSelect={() => {}}
      />,
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('logs an error if you pass in an array not containing strings to "cards"', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(<PlayerHand cards={[1, 2]} selected={[0, 1]} onSelect={() => {}} />);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error if "selected" prop is not an array', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand
        cards={['card1', 'card2', 'card3']}
        selected="not an array"
        onSelect={() => {}}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error if "onSelect is not a function', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand
        cards={['card1', 'card2', 'card3']}
        selected={[1, 2]}
        onSelect="not a function"
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  // --------------------------------------------------------------------------
  // Snapshot Test
  it('renders correctly', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const tree = renderer
      .create(
        <PlayerHand cards={whiteCards} selected={[0, 1]} onSelect={() => {}} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
