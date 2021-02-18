/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';

import TallyCount from './TallyCount';

// https://jestjs.io/docs/en/tutorial-react#snapshot-testing-with-mocks-enzyme-and-react-16
jest.mock('./TallyGroup', () => ({ tallyCount, color }) => 
  <tally-group-mock data-testid='tally-group' data-tallycount={ tallyCount } data-color={ color } />
);

describe('TallyCount', () => {
  describe('score', () => {
    it('renders a single tallygroup when score is 5', () => {
      render(<TallyCount color="primary" score={5} />);
      expect(screen.queryByText('5')).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('tally-group').length).toBe(1);
    });

    it('renders a single tallygroup when score is < 5', () => {
      render(<TallyCount color="primary" score={2} />);
      expect(screen.queryByText('2')).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('tally-group').length).toBe(1);
    });

    it('renders two tallygroups when score is > 5', () => {
      render(<TallyCount color="primary" score={6} />);
      expect(screen.queryByText('6')).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('tally-group').length).toBe(2);
    });

    it('renders two tallygroups when score is 10', () => {
      render(<TallyCount color="primary" score={10} />);
      expect(screen.queryByText('10')).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('tally-group').length).toBe(2);
    });

    it('renders two tallygroups in the correct order when score is 8', () => {
      render(<TallyCount color="primary" score={8} />);

      // Because we're querying ALL, we can expect the order of the array to match what is 
      // rendered in the view. QueryAllByTestId reads the DOM tree from top to bottom.
      const tallyGroups = screen.queryAllByTestId('tally-group');
      expect(tallyGroups[0].dataset.tallycount).toBe('5');
      expect(tallyGroups[1].dataset.tallycount).toBe('3');
    });

    it('doesn\'t render two tallygroups in the incorrect order when score is 8', () => {
      render(<TallyCount color="primary" score={8} />);

      // Because we're querying ALL, we can expect the order of the array to match what is 
      // rendered in the view. QueryAllByTestId reads the DOM tree from top to bottom.
      const tallyGroups = screen.queryAllByTestId('tally-group');
      expect(tallyGroups[0].dataset.tallycount).not.toBe('3');
      expect(tallyGroups[1].dataset.tallycount).not.toBe('5');
    });

    it('renders the score as a number when greater than 10', () => {
      render(<TallyCount color="primary" score={11} />);
      expect(screen.getByText('11')).toBeInTheDocument();
    });
  });

  describe('color', () => {
    it('passes proper color to tallyGroup when color is primary', () => {
      render(<TallyCount color="primary" score={5} />);
      const tallyGroup = screen.queryByTestId('tally-group');
      expect(tallyGroup.dataset.color).toBe('primary');
    });

    it('passes proper color to tallyGroup when color is secondary', () => {
      render(<TallyCount color="secondary" score={5} />);
      const tallyGroup = screen.queryByTestId('tally-group');
      expect(tallyGroup.dataset.color).toBe('secondary');
    });

    it('passes proper color to all tallyGroups', () => {
      render(<TallyCount color="secondary" score={10} />);
      const tallyGroups = screen.queryAllByTestId('tally-group');
      expect(tallyGroups[0].dataset.color).toBe('secondary');
      expect(tallyGroups[1].dataset.color).toBe('secondary');
    });
  });
});
