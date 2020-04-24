import React from "react";
import { FormattedMessage } from "react-intl";

export const PageNotFound = () => {
  return (
    <div id="container" data-testid="page-not-found-container">
      <FormattedMessage id="PageNotFound" />
    </div>
  );
};

export default PageNotFound;
