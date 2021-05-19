import BaseReducer from '../../utilities/BaseReducer';
import StreamAction from './StreamAction';

export default class StreamReducer extends BaseReducer {
    initialState = {
        recordFiles: [],
        streamsData: [],
        streamStatus: [],
    };

    [StreamAction.REQUEST_RECORD_FILES_FINISHED](state, action) {
        return {
            ...state,
            recordFiles: action.payload,
        };
    }

    [StreamAction.STREAM_START_FINISHED](state, action) {
        return {
            ...state,
            streamsData: state.streamsData.map((data, i) => (data.id === action.payload.id ? { ...data, streamId: action.payload.data.pid, publishing: true } : data)),
        };
    }

    [StreamAction.STREAM_STOP_FINISHED](state, action) {
        return {
            ...state,
            streamsData: state.streamsData.map((data, i) => (data.id === action.payload.id ? { ...data, streamId: -1, publishing: false } : data)),
        };
    }

    [StreamAction.ADD_TABLE_DATA](state, action) {
        return {
            ...state,
            streamsData: [...state.streamsData, action.data],
        };
    }

    [StreamAction.REMOVE_TABLE_DATA](state, action) {
        return {
            ...state,
            streamsData: state.streamsData.filter((element) => element.id !== action.data),
        };
    }

    [StreamAction.UPDATE_TABLE](state, action) {
        const streamData = state.streamsData.map((data, i) =>
            data.id === action.data.id
                ? action.data.type === 'FILE_NAME'
                    ? { ...data, fileName: action.data.value }
                    : action.data.type === 'SERVER_TYPE'
                    ? { ...data, serverType: action.data.value }
                    : action.data.type === 'STREAM_NAME'
                    ? { ...data, streamName: action.data.value }
                    : data
                : data
        );
        return {
            ...state,
            streamsData: streamData,
        };
    }

    [StreamAction.STREAM_STATUS_RECEIVED_FINISHED](state, action) {
        return {
            ...state,
            streamStatus: action.result,
        };
    }
}
