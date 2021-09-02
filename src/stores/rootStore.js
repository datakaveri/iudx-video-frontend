import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import environment from 'environment';
import rootReducer from './rootReducer';


const Store = (initialState, history) => {
    const middleware = [environment.isDevelopment ? reduxFreeze : null, thunk, routerMiddleware(history)].filter(Boolean);

    // const store = createStore(rootReducer(history), initialState, applyMiddleware(...middleware));
    const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

    return store;
};

export default Store;
