import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Component from '../ScanDetails.view';

describe('ScanDetails.view.component', () => {
  it('should render correctly', () => {
    const { container } = render(<Component />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
