import React from 'react';
import {render, screen} from '@testing-library/react';
import AppWithRedux from "./app/AppWithRedux/AppWithRedux";

test.skip('renders learn react link', () => {
  render(<AppWithRedux />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
