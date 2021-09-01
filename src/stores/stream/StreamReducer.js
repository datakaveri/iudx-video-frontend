import BaseReducer from '../../utilities/BaseReducer';
import StreamAction from './StreamAction';

export default class StreamReducer extends BaseReducer {
    initialState = {
        streams: [],
        error: {}
    };

    [StreamAction.GET_STREAMS_FINISHED](state, action) {
        return {
            ...state,
            streams: action.payload.results,
        };
    }

    [StreamAction.GET_STREAMS_ERROR](state, action) {
        return {
            ...state,
            streams: [],
            error: action.payload,
        };
    }

    [StreamAction.STREAM_REQUEST_FINISHED](state, action) {
        return {
            ...state,
            streams: [...state.streams.map((stream) => {
                if (stream === action.payload.streamId) {
                    // add stream url to stream here
                }
                return stream;
            })],
        };
    }
}
