import React, { Suspense, lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import RouteEnum from '../constants/RoutesEnum';
import Loading from './shared/loading/Loading';
import withAuth from './auth-page/withAuth';

// lazy loading pages
const LoginPage = lazy(() => import('./auth-page/login-page/LoginPage'));
const AdminPage = lazy(() => import('./admin-page/AdminPage'));
const RegisterPage = lazy(() => import('./auth-page/register-page/RegisterPage'));
const EmailConfirmPage = lazy(() => import('./auth-page/email-confirm-page/EmailConfirmPage'));
const DashboardPage = lazy(() => import('./dashboard-page/DashboardPage'));
const CameraPage = lazy(() => import('./camera-page/CameraPage'));

const App = (props) => {
    const { history } = props;

    return (
        <div>
            <ConnectedRouter history={history}>
                <Suspense fallback={<Loading isActive={true} />}>
                    <Switch>
                        <Route path={RouteEnum.Login} component={LoginPage} />
                        <Route path={RouteEnum.Register} component={RegisterPage} />
                        <Route path={RouteEnum.Confirm} component={EmailConfirmPage} />
                        <Route path={RouteEnum.Admin} component={withAuth(AdminPage, true)} />
                        <Route exact path={RouteEnum.Home} component={withAuth(DashboardPage)} />
                        <Route path={RouteEnum.Cameras} component={withAuth(CameraPage)} />
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        </div>
    );
};
export default App;
