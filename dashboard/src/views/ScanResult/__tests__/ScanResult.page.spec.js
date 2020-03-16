import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Component from '../ScanResult.page';

jest.mock('../../../services/scans.service', () => ({
  fetchScanResults: jest.fn().mockResolvedValue([
    {
      id: 'C2xBma8j5fgWqZRCk7NL',
      status: 'In Progress',
      totalFindings: 3,
      repoName: 'Project 2',
      queuedAt: 1893832600,
    },
  ]),
}));

describe('ScanResult.page.component', () => {
  afterEach(cleanup);

  it('should fetch data and render successfully', async () => {
    let component;
    await act(async () => {
      component = render(<Component />, { wrapper: MemoryRouter });
    });
    expect(component.getByText('Project 2')).toBeInTheDocument();
    expect(component.getByText('In Progress')).toBeInTheDocument();
  });
});
