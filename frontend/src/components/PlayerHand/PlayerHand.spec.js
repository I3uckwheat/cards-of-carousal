import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import PlayerHand from './PlayerHand';

describe('PlayerHand', () => {
  it('fires the onSelect callback when a card is touched', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onClick = jest.fn();

    render(
      <PlayerHand cards={whiteCards} selectedCards={[]} onSelect={onClick} />,
    );

    userEvent.click(screen.getByText('Briggs'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires the onSelect callback with the index of the clicked card', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onSelectMock = jest.fn();

    render(
      <PlayerHand
        cards={whiteCards}
        selectedCards={[]}
        onSelect={onSelectMock}
      />,
    );

    userEvent.click(screen.getByText('Bender'));
    expect(onSelectMock).toHaveBeenCalledWith([1]);
  });

  it('fires onSelect callback with the indexes of multiple clicked cards', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const onSelectMock = jest.fn();

    render(
      <PlayerHand
        cards={whiteCards}
        selectedCards={[]}
        onSelect={onSelectMock}
      />,
    );

    userEvent.click(screen.getByText('Bender'));
    userEvent.click(screen.getByText('hi'));

    expect(onSelectMock).toHaveBeenCalledWith([3]);
    expect(onSelectMock).toHaveBeenCalledWith([1]);
  });

  it('works when there is a value in selected', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const selectedCards = [1];
    const onSelectMock = jest.fn();

    render(
      <PlayerHand
        cards={whiteCards}
        selectedCards={selectedCards}
        onSelect={onSelectMock}
      />,
    );

    expect(selectedCards[0]).toEqual(1);
  });

  it('removes the value from "selected" if "selected" already includes it', () => {
    const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];
    const selectedCards = [1];
    const onSelectMock = jest.fn();

    render(
      <PlayerHand
        cards={whiteCards}
        selectedCards={selectedCards}
        onSelect={onSelectMock}
      />,
    );

    userEvent.click(screen.getByText('Bender'));
    expect(onSelectMock).toHaveBeenCalledWith([]);
  });

  // --------------------------------------------------------------------------
  // PropType Testing
  it('does not log an error when the required props are provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand
        cards={['card1', 'card2', 'card3']}
        selectedCards={[0, 1]}
        onSelect={() => {}}
      />,
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('logs an error if you pass in an array not containing strings to "cards"', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand cards={[1, 2]} selectedCards={[0, 1]} onSelect={() => {}} />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error if "selected" prop is not an array', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <PlayerHand
        cards={['card1', 'card2', 'card3']}
        selectedCards="not an array"
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
        selectedCards={[1, 2]}
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
        <PlayerHand
          cards={whiteCards}
          selectedCards={[0, 1]}
          onSelect={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
