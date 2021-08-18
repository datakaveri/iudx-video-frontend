import ServerEffect from './ServerEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class ServerAction {
    static REQUEST_SERVERS = 'ServerAction.REQUEST_SERVERS';
    static REQUEST_SERVERS_FINISHED = 'ServerAction.REQUEST_SERVERS_FINISHED';

    static UPDATE_SERVERS = 'ServerAction.UPDATE_SERVERS';

    static CONTAINER_STATUS_RECEIVED = 'ServerAction.CONTAINER_STATUS_RECEIVED';
    static CONTAINER_STATUS_RECEIVED_FINISHED = 'ServerAction.CONTAINER_STATUS_RECEIVED_FINISHED';
    static CONTAINER_STATUS_FAIL = 'ServerAction.CONTAINER_STATUS_FAIL';
    static CONTAINER_STATUS_SUCCESS = 'ServerAction.CONTAINER_STATUS_SUCCESS';

    static NGINX_STATS_RECEIVED = 'ServerAction.NGINX_STATS_RECEIVED';
    static NGINX_STATS_RECEIVED_FINISHED = 'ServerAction.NGINX_STATS_RECEIVED_FINISHED';
    static NGINX_STATS_FAIL = 'ServerAction.NGINX_STATS_FAIL';
    static NGINX_STATS_SUCCESS = 'ServerAction.NGINX_STATS_SUCCESS';

    static RTSP_STATS_RECEIVED = 'ServerAction.RTSP_STATS_RECEIVED';
    static RTSP_STATS_RECEIVED_FINISHED = 'ServerAction.RTSP_STATS_RECEIVED_FINISHED';
    static RTSP_STATS_FAIL = 'ServerAction.RTSP_STATS_FAIL';
    static RTSP_STATS_SUCCESS = 'ServerAction.RTSP_STATS_SUCCESS';

    static requestServers() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, ServerAction.REQUEST_SERVERS, ServerEffect.requestServers);
        };
    }

    static updateServers(servers) {
        return ActionUtility.createAction(ServerAction.UPDATE_SERVERS, servers);
    }

    static containerStatusReceive() {
        return (dispatch) => {
            const containerStatus = (status) => {
                return dispatch({
                    type: ServerAction.CONTAINER_STATUS_RECEIVED_FINISHED,
                    result: status,
                });
            };

            return dispatch({
                type: ServerAction.CONTAINER_STATUS_RECEIVED,
                types: [ServerAction.CONTAINER_STATUS_RECEIVED, ServerAction.CONTAINER_STATUS_SUCCESS, ServerAction.CONTAINER_STATUS_FAIL],
                promise: () => containerStatus([]),
            });
        };
    }

    static nginxStatsReceive() {
        return (dispatch) => {
            const containerStatus = (status) => {
                return dispatch({
                    type: ServerAction.NGINX_STATS_RECEIVED_FINISHED,
                    result: status,
                });
            };

            return dispatch({
                type: ServerAction.NGINX_STATS_RECEIVED,
                types: [ServerAction.NGINX_STATS_RECEIVED, ServerAction.NGINX_STATS_SUCCESS, ServerAction.NGINX_STATS_FAIL],
                promise: () => containerStatus([]),
            });
        };
    }

    static rtspServerStatsReceive() {
        return (dispatch) => {
            const containerStatus = (status) => {
                return dispatch({
                    type: ServerAction.RTSP_STATS_RECEIVED_FINISHED,
                    result: status,
                });
            };

            return dispatch({
                type: ServerAction.RTSP_STATS_RECEIVED,
                types: [ServerAction.RTSP_STATS_RECEIVED, ServerAction.RTSP_STATS_SUCCESS, ServerAction.RTSP_STATS_FAIL],
                promise: () => containerStatus([]),
            });
        };
    }
}
