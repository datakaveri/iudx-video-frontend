import StreamEffect from './StreamEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class StreamAction {
    static REQUEST_RECORD_FILES = 'StreamAction.REQUEST_RECORD_FILES';
    static REQUEST_RECORD_FILES_FINISHED = 'StreamAction.REQUEST_RECORD_FILES_FINISHED';

    static STREAM_START = 'StreamAction.STREAM_START';
    static STREAM_START_FINISHED = 'StreamAction.STREAM_START_FINISHED';

    static STREAM_STOP = 'StreamAction.STREAM_STOP';
    static STREAM_STOP_FINISHED = 'StreamAction.STREAM_STOP_FINISHED';

    static ADD_TABLE_DATA = 'StreamAction.ADD_TABLE_DATA';
    static REMOVE_TABLE_DATA = 'StreamAction.REMOVE_TABLE_DATA';
    static UPDATE_TABLE = 'StreamAction.UPDATE_TABLE';

    static STREAM_STATUS_RECEIVED = 'StreamAction.STREAM_STATUS_RECEIVED';
    static STREAM_STATUS_RECEIVED_FINISHED = 'StreamAction.STREAM_STATUS_RECEIVED_FINISHED';
    static STREAM_STATUS_FAIL = 'StreamAction.STREAM_STATUS_FAIL';
    static STREAM_STATUS_SUCCESS = 'StreamAction.STREAM_STATUS_SUCCESS';

    static requestRecordFiles() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, StreamAction.REQUEST_RECORD_FILES, StreamEffect.requestRecordFiles);
        };
    }

    static startStream(streamData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, StreamAction.STREAM_START, StreamEffect.startStream, streamData);
        };
    }

    static stopStream(streamData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, StreamAction.STREAM_STOP, StreamEffect.stopStream, streamData);
        };
    }

    static addTableData(data) {
        return {
            type: StreamAction.ADD_TABLE_DATA,
            data: data,
        };
    }

    static removeTableData(id) {
        return {
            type: StreamAction.REMOVE_TABLE_DATA,
            data: id,
        };
    }

    static updateTable(data) {
        return {
            type: StreamAction.UPDATE_TABLE,
            data: data,
        };
    }

    static streamStatusReceive() {
        return (dispatch) => {
            const streamStatus = (status) => {
                return dispatch({
                    type: StreamAction.STREAM_STATUS_RECEIVED_FINISHED,
                    result: status,
                });
            };

            return dispatch({
                type: StreamAction.STREAM_STATUS_RECEIVED,
                types: [StreamAction.STREAM_STATUS_RECEIVED, StreamAction.STREAM_STATUS_SUCCESS, StreamAction.STREAM_STATUS_FAIL],
                promise: () => streamStatus([]),
            });
        };
    }
}
