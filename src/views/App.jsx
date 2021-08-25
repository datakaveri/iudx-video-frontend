import React, { Suspense, lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import RouteEnum from '../constants/RoutesEnum';
import Loading from './shared/loading/Loading';
import withAuth from './auth-page/withAuth';
import FilesDownloadPage from './files-download-page/FilesDownloadPage';

// lazy loading pages
const LoginPage = lazy(() => import('./auth-page/login-page/LoginPage'));
const AdminPage = lazy(() => import('./admin-page/AdminPage'));
const RegisterPage = lazy(() => import('./auth-page/register-page/RegisterPage'));
const EmailConfirmPage = lazy(() => import('./auth-page/email-confirm-page/EmailConfirmPage'));
const DashboardPage = lazy(() => import('./dashboard-page/DashboardPage'));
const RecordPage = lazy(() => import('./record-page/RecordPage'));
const StreamPage = lazy(() => import('./stream-page/StreamPage'));
const AutoRoutingPage = lazy(() => import('./auto-routing-page/AutoRoutingPage'));

const App = (props) => {
    const { history } = props;

    return (
        <div>
            <ConnectedRouter history={history}>
                <Suspense fallback={<Loading isActive={true} />}>
                    <Switch>
                        <Route path={RouteEnum.Login} component={LoginPage} />
                        <Route path={RouteEnum.Admin} component={AdminPage} />
                        <Route path={RouteEnum.Register} component={RegisterPage} />
                        <Route path={RouteEnum.Confirm} component={EmailConfirmPage} />
                        <Route exact path={RouteEnum.Home} component={withAuth(DashboardPage)} />
                        <Route path={RouteEnum.Record} component={withAuth(RecordPage)} />
                        <Route path={RouteEnum.Stream} component={withAuth(StreamPage)} />
                        <Route path={RouteEnum.AutoRouting} component={withAuth(AutoRoutingPage)} />
                        <Route path={RouteEnum.FilesDownload} component={withAuth(FilesDownloadPage)} />
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        </div>
    );
};
export default App;
