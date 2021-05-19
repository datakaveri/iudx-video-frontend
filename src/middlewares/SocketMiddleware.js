export default function SocketMiddleware(socket) {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, isSocket, type, types, ...others } = action;

        if (!isSocket || !promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({ ...others, type: REQUEST });

        return promise(socket)
            .then((result) => {
                return next({ ...others, result, type: SUCCESS });
            })
            .catch((error) => {
                return next({ ...others, error, type: FAILURE });
            });
    };
}
