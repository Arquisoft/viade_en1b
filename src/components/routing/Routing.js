import React from 'react'
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from '../layout/login/Login';
import MyProfile from '../user/myProfile/MyProfile';
import Dashboard from '../dashboard/Dashboard';
import UploadRoute from '../routes/uploadRoute/UploadRoute';
import PageNotFound from '../pageNotFound/PageNotFound';
import MyRoutes from '../routes/myRoutes/MyRoutes'
import ShareRoute from '../routes/shareRoute/ShareRoute';

export default function Routing(props) {
    const {navBar} = props
    return (
    <HashRouter>
        {navBar}
        <Switch>
                <Route exact path="/404" render={props => <PageNotFound {...props} />}></Route>
                <Route exact path="/profile" render={() => <MyProfile {...props} />}></Route>
                <Route exact path="/dashboard" render={() => <Dashboard {...props} />}></Route>
                <Route exact path="/routes/upload" render={() => <UploadRoute {...props} />}></Route>
                <Route exact path="/routes/MyRoutes" render={() => <MyRoutes {...props} />}></Route>
                <Route exact path="/routes/ShareRoute" render={() => <ShareRoute {...props} />}></Route>
                <Route exact path="/" render={props => <Login {...props} />}></Route>
                <Redirect to="/404" />
          </Switch>
    </HashRouter>
    )
}
