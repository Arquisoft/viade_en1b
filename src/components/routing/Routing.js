import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "../layout/login/Login";
import MyProfile from "../user/myProfile/MyProfile";
import Dashboard from "../dashboard/Dashboard";
import UploadRoute from "../routes/uploadRoute/UploadRoute";
import PageNotFound from "../layout/pageNotFound/PageNotFound";
import MyRoutes from "../routes/myRoutes/MyRoutes";
import Settings from "../layout/settings/Settings";
import ShareRoute from "../routes/shareRoute/ShareRoute";

export default function Routing(props) {
  const { navBar } = props;
  return (
    <HashRouter>
      {navBar}
      <Switch>
        <Route exact path="/404" component={PageNotFound} />
        <Route exact path="/" render={(props) => <Login {...props} />}></Route>
        <Route
          exact
          path="/profile"
          render={() => <MyProfile {...props} />}
        ></Route>
        <Route
          exact
          path="/notifications"
          render={() => <Notifications {...props} />}
        ></Route>
        <Route
          exact
          path="/dashboard"
          render={() => <Dashboard {...props} />}
        ></Route>
        <Route
          exact
          path="/routes/upload"
          render={() => <UploadRoute {...props} />}
        ></Route>
        <Route
          exact
          path="/settings"
          render={() => (
            <Settings
              {...props}
              changeTheme={() => {}}
              changeLanguage={() => {}}
            />
          )}
        ></Route>
        <Route
          exact
          path="/routes/MyRoutes"
          render={() => <MyRoutes {...props} />}
        ></Route>
        <Route
          exact
          path="/routes/shareRoute"
          render={() => <ShareRoute {...props} />}
        ></Route>
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
}
