import BaseReducer from '../../utilities/BaseReducer';
import SocketAction from './SocketAction';

export default class SocketReducer extends BaseReducer {
    initialState = {
        socketConnected: false,
    };

    [SocketAction.SOCKET_CONNECT](state, action) {
        return {
            ...state,
            socketConnected: true,
        };
    }

    [SocketAction.SOCKET_DISCONNECT](state, action) {
        return {
            ...state,
            socketConnected: false,
        };
    }
}
