import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ServerReducer from './servers/ServerReducer';
import SocketReducer from './socket/SocketReducer';
import RecordReducer from './recording/RecordReducer';
import StreamReducer from './stream/StreamReducer';
import RoutingReducer from './routing/RoutingReducer';
import AuthReducer from './auth/AuthReducer';
import FilesReducer from './files/FilesReducer';

const Reducer = (history) => {
    const reducerMap = {
        router: connectRouter(history),
        serverReducer: new ServerReducer().reducer,
        socketReducer: new SocketReducer().reducer,
        recordReducer: new RecordReducer().reducer,
        streamReducer: new StreamReducer().reducer,
        routingReducer: new RoutingReducer().reducer,
        authReducer: new AuthReducer().reducer,
        filesReducer: new FilesReducer().reducer,
    };

    return combineReducers(reducerMap);
};

export default Reducer;
