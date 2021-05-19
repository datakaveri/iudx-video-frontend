import BaseReducer from '../../utilities/BaseReducer';
import RecordAction from './RecordAction';

export default class ServerReducer extends BaseReducer {
    initialState = {
        recordsData: [],
    };

    [RecordAction.RECORD_START_FINISHED](state, action) {
        return {
            ...state,
            recordsData: [...state.recordsData, action.payload],
        };
    }

    [RecordAction.RECORD_STOP_FINISHED](state, action) {
        return {
            ...state,
            recordsData: state.recordsData.map((data, i) =>
                data.streamName === action.payload.streamName && data.filePath === action.payload.filePath ? { ...data, status: action.payload.status } : data
            ),
        };
    }
}
