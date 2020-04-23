import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { locales } from "../../../utils/locales";
import { IntlProvider } from "react-intl";

const history = createMemoryHistory();

const TestingRouter = ({ ComponentWithRedirection, redirectUrl }) => (
  <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
    <Router history={history}>
      <Route
        path="/"
        exact={true}
        render={() => <ComponentWithRedirection />}
      />
      <Route
        path={redirectUrl}
        exact={true}
        render={() => <div>{redirectUrl}</div>}
      />
    </Router>
  </IntlProvider>
);

export default TestingRouter;
