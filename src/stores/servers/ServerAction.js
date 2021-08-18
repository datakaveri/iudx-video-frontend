
export default class ServerAction {
    static NGINX_STATS_RECEIVED = 'ServerAction.NGINX_STATS_RECEIVED';
    static NGINX_STATS_RECEIVED_FINISHED = 'ServerAction.NGINX_STATS_RECEIVED_FINISHED';
    static NGINX_STATS_FAIL = 'ServerAction.NGINX_STATS_FAIL';
    static NGINX_STATS_SUCCESS = 'ServerAction.NGINX_STATS_SUCCESS';

    static RTSP_STATS_RECEIVED = 'ServerAction.RTSP_STATS_RECEIVED';
    static RTSP_STATS_RECEIVED_FINISHED = 'ServerAction.RTSP_STATS_RECEIVED_FINISHED';
    static RTSP_STATS_FAIL = 'ServerAction.RTSP_STATS_FAIL';
    static RTSP_STATS_SUCCESS = 'ServerAction.RTSP_STATS_SUCCESS';

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
