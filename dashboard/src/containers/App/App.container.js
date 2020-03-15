import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Wrapper, Header, Content } from './App.container.styles';
// Views
import ScanResultpage from '../../views/ScanResult';
import ScanDetailsPage from '../../views/ScanDetails';
import ScanSubmitPage from '../../views/ScanSubmit';

const AppContainer = () => (
  <Wrapper>
    <Header>Guardrails Code Challenge</Header>
    <Content>
      <Switch>
        <Route exact path="/" component={ScanResultpage} />
        <Route path="/submit" component={ScanSubmitPage} />
        <Route path="/scan/:id" component={ScanDetailsPage} />
      </Switch>
    </Content>
  </Wrapper>
);

export default AppContainer;
