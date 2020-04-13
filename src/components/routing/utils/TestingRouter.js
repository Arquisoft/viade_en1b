import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
const history = createMemoryHistory();

const TestingRouter = ({ ComponentWithRedirection, redirectUrl }) => (
  <Router history={history}>
    <Route path="/" exact={true} render={() => <ComponentWithRedirection />} />
    <Route
      path={redirectUrl}
      exact={true}
      render={() => <div>{redirectUrl}</div>}
    />
  </Router>
);

export default TestingRouter;
