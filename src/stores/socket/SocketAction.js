export default class SocketAction {
    static SOCKET_CONNECT = 'SocketAction.CONNECT';
    static SOCKET_CONNECT_SUCCESS = 'SocketAction.CONNECT_SUCCESS';
    static SOCKET_CONNECT_FAIL = 'SocketAction.CONNECT_FAIL';

    static SOCKET_DISCONNECT = 'SocketAction.DISCONNECT';
    static SOCKET_DISCONNECT_SUCCESS = 'SocketAction.DISCONNECT_SUCCESS';
    static SOCKET_DISCONNECT_FAIL = 'SocketAction.CONNECT_FAIL';

    static connect() {
        return {
            type: SocketAction.SOCKET_CONNECT,
            types: [SocketAction.SOCKET_CONNECT, SocketAction.SOCKET_CONNECT_SUCCESS, SocketAction.SOCKET_CONNECT_FAIL],
            isSocket: true,
            promise: (socket) => socket.connect(),
        };
    }

    static disconnect() {
        return {
            type: SocketAction.SOCKET_DISCONNECT,
            types: [SocketAction.SOCKET_DISCONNECT, SocketAction.SOCKET_DISCONNECT_SUCCESS, SocketAction.SOCKET_DISCONNECT_FAIL],
            isSocket: true,
            promise: (socket) => socket.disconnect(),
        };
    }
}
