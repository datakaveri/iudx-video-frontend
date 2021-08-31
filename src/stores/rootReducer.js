import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import StreamReducer from './stream/StreamReducer';
import AuthReducer from './auth/AuthReducer';
import CameraReducer from './camera/CameraReducer';

const Reducer = (history) => {
    const reducerMap = {
        router: connectRouter(history),
        streamReducer: new StreamReducer().reducer,
        authReducer: new AuthReducer().reducer,
        cameraReducer: new CameraReducer().reducer,
    };

    return combineReducers(reducerMap);
};

export default Reducer;
