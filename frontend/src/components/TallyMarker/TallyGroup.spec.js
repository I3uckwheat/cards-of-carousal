import React from 'react';
import { render, screen } from '@testing-library/react';

import TallyGroup from './TallyGroup';

describe('TallyGroup', () => {
  it('renders', () => {
    render(<TallyGroup color="primary" tallyCount={3} />);
    expect(screen.getByTestId('tally-svg')).toBeInTheDocument();
  });

  describe('tallyCount', () => {
    it('renders all tallies', () => {
      render(<TallyGroup color="primary" tallyCount={5} />);
      const tallies = screen.getAllByTestId('tally');
      expect(tallies.length).toBe(5);
    });

    it('renders the expected amount of tallies', () => {
      render(<TallyGroup color="primary" tallyCount={2} />);
      const tallies = screen.getAllByTestId('tally');
      expect(tallies.length).toBe(2);
    });

    it('renders without any tallies', () => {
      render(<TallyGroup color="primary" tallyCount={0} />);
      const tallies = screen.queryAllByTestId('tally');
      expect(tallies.length).toBe(0);
    });
  });

  describe('color', () => {
    it('sets the color of the tallies to the primary color', () => {
      render(<TallyGroup color="primary" tallyCount={2} />);
      expect(screen.queryByTestId('tally-svg')).toMatchSnapshot();
    });

    it('sets the color of the tallies to the secondary color', () => {
      render(<TallyGroup color="secondary" tallyCount={2} />);
      expect(screen.queryByTestId('tally-svg')).toMatchSnapshot();
    });

    it('sets the color of the tallies to the faded color', () => {
      render(<TallyGroup color="secondary" tallyCount={2} faded />);
      expect(screen.queryByTestId('tally-svg')).toMatchSnapshot();
    });
  });
});
