import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Component from '../ScanResult.view';

describe('ScanResult.view.component', () => {
  it('should render correctly', () => {
    const { container } = render(<Component />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
