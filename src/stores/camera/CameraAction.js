import CameraEffect from './CameraEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class CameraAction {
    static LIST_CAMERAS = 'CameraAction.LIST_CAMERAS';
    static LIST_CAMERAS_FINISHED = 'CameraAction.LIST_CAMERAS_FINISHED';

    static LIST_STREAMS = 'CameraAction.LIST_STREAMS';
    static LIST_STREAMS_FINISHED = 'CameraAction.LIST_STREAMS_FINISHED';

    static listCameras(requestParams) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, CameraAction.LIST_CAMERAS, CameraEffect.listCameras, requestParams);
        };
    }

    static listStreamsByCamera(requestParams) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, CameraAction.LIST_STREAMS, CameraEffect.listStreamsByCamera, requestParams);
        };
    }
}
