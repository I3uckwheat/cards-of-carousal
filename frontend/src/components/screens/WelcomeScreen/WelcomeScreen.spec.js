import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
