/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import ContextProvider, { store } from './context';

describe('context', () => {
  it('renders children', () => {
    render(
      <ContextProvider>
        <p>Hello world</p>
      </ContextProvider>,
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('passes state to components', () => {
  //   function TestComponent() {
  //     const { state, dispatch } = useContext(store);
  //     dispatch({ type: 'set' });
  //     return (
  //       <div>
  //         <h1>{state.socketIsActive.toString()}</h1>
  //         <p>{state.isHosting.toString()}</p>
  //       </div>
  //     );
  //   }
  //   render(
  //     <ContextProvider value={{ socketIsActive: true }}>
  //       <TestComponent />
  //     </ContextProvider>,
  //   );
  //   expect(screen.getByText('false')).toBeInTheDocument();
  // });
});
