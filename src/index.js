import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './views/App';
import { Provider } from 'react-redux';
import rootStore from './stores/rootStore';
import SocketUtility from './utilities/SocketUtility';
import environment from 'environment';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

(async (window) => {
    const initialState = {};
    const history = createBrowserHistory({ basename: environment.route.baseRoute });
    const socket = new SocketUtility();
    const store = rootStore(initialState, history, socket);

    const rootEl = document.getElementById('root');
    const render = (Component, el) => {
        ReactDOM.render(
            <Provider store={store}>
                <Component history={history} dispatch={store.dispatch} />
            </Provider>,
            el
        );
    };

    render(App, rootEl);
})(window);
