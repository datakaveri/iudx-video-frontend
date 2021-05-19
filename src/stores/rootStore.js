import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import environment from 'environment';
import rootReducer from './rootReducer';

import SocketMiddleware from '../middlewares/SocketMiddleware';

const Store = (initialState, history, socket) => {
    const middleware = [environment.isDevelopment ? reduxFreeze : null, thunk, routerMiddleware(history), SocketMiddleware(socket)].filter(Boolean);

    const store = createStore(rootReducer(history), initialState, applyMiddleware(...middleware));
    // const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

    return store;
};

export default Store;
