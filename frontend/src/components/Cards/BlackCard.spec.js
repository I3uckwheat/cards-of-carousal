import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import BlackCard from './BlackCard';

describe('BlackCard', () => {
  describe('rendering', () => {
    it('renders the BlackCard component given a pickCount number and a string', () => {
      render(<BlackCard pickCount={0}>Howdy</BlackCard>);

      expect(screen.getByText('Howdy')).toBeInTheDocument();
      expect(screen.getByText('PICK')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.queryAllByTestId('layerCard')).toHaveLength(1);
    });

    it('renders a black card with no main text present', () => {
      render(<BlackCard pickCount={0} />);
      expect(screen.getByTestId('black-card')).toBeInTheDocument();
      expect(screen.getByText('PICK')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.queryAllByTestId('layerCard')).toHaveLength(1);
    });
  });

  describe('text parsing', () => {
    it('properly converts markdown to JSX', () => {
      const string = 'This _is_ a **test**\n\n Here is a *new* __line__';
      const tree = renderer
        .create(<BlackCard pickCount={0}>{string}</BlackCard>)
        .toJSON();

      expect(screen.queryAllByText('\n')).toHaveLength(0);
      expect(tree).toMatchSnapshot();
    });

    it('does not display markdown', () => {
      render(<BlackCard pickCount={0}># **This** _is_ a test</BlackCard>);

      expect(screen.queryByText('#')).not.toBeInTheDocument();
      expect(screen.queryByText('**')).not.toBeInTheDocument();
      expect(screen.queryByText('_')).not.toBeInTheDocument();
    });

    it('properly converts single underscores to longer blanks', () => {
      render(<BlackCard pickCount={0}>This is a _ test.</BlackCard>);

      expect(screen.getByText(/________/)).toBeInTheDocument();
    });

    it('properly converts single underscores next to punctuation to longer blanks', () => {
      render(<BlackCard pickCount={0}>This is a _.</BlackCard>);

      expect(screen.getByText(/________./)).toBeInTheDocument();
    });

    it('does not display single underscores by themselves', () => {
      render(<BlackCard pickCount={0}>This _ should be long</BlackCard>);

      expect(screen.queryByText(/ _ /)).not.toBeInTheDocument();
    });
  });
});
