import BaseReducer from '../../utilities/BaseReducer';
import ServerAction from './ServerAction';

export default class ServerReducer extends BaseReducer {
    initialState = {
        nginxStreams: [],
        rtspStreams: [],
    };


    [ServerAction.NGINX_STATS_RECEIVED_FINISHED](state, action) {
        return {
            ...state,
            nginxStreams: action.result,
        };
    }

    [ServerAction.RTSP_STATS_RECEIVED_FINISHED](state, action) {
        return {
            ...state,
            rtspStreams: action.result,
        };
    }
}
