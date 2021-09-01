import StreamEffect from './StreamEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class StreamAction {
    static GET_STREAMS = 'StreamAction.GET_STREAMS';
    static GET_STREAMS_FINISHED = 'StreamAction.GET_STREAMS_FINISHED';
    static GET_STREAMS_ERROR = 'StreamAction.GET_STREAMS_ERROR';

    static STREAM_REQUEST = 'StreamAction.STREAM_REQUEST';
    static STREAM_REQUEST_FINISHED = 'StreamAction.STREAM_REQUEST_FINISHED';

    static getStreams(cameraId) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, StreamAction.GET_STREAMS, StreamEffect.getAllStreams, cameraId);
        };
    }

    static requestStream(streamId) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, StreamAction.STREAM_REQUEST, StreamEffect.requestStream, streamId);
        };
    }
}
