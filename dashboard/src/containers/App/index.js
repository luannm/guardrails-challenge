import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import ScanDetailsPage from '../ScanDetailsPage';
import SubmitScanPage from '../SubmitScanPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/submit" component={SubmitScanPage} />
        <Route path="/scan/:id" component={ScanDetailsPage} />
      </Switch>
    </div>
  );
}
