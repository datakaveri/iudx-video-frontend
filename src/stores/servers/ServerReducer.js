import BaseReducer from '../../utilities/BaseReducer';
import ServerAction from './ServerAction';

export default class ServerReducer extends BaseReducer {
    initialState = {
        servers: [],
        nginxStreams: [],
        rtspStreams: [],
    };

    [ServerAction.REQUEST_SERVERS_FINISHED](state, action) {
        return {
            ...state,
            servers: action.payload,
        };
    }

    [ServerAction.UPDATE_SERVERS](state, action) {
        const updateServer = [...JSON.parse(JSON.stringify(state.servers))];
        const { index, disabled } = action.payload;
        updateServer[index].disabled = disabled;
        return {
            ...state,
            servers: updateServer,
        };
    }

    [ServerAction.CONTAINER_STATUS_RECEIVED_FINISHED](state, action) {
        const updateServer = [...JSON.parse(JSON.stringify(state.servers))];
        for (const [i, server] of updateServer.entries()) {
            let status = false;
            if (Array.isArray(action.result)) {
                for (const serverData of action.result) {
                    if (serverData.Names.includes('/' + server.container)) {
                        status = true;
                        break;
                    }
                }

                if (status !== state.servers[i].running) {
                    updateServer[i].running = status;
                    updateServer[i].disabled = false;
                }
            }
        }
        return {
            ...state,
            servers: updateServer,
        };
    }

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
