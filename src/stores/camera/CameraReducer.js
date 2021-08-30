import BaseReducer from '../../utilities/BaseReducer';
import CameraAction from './CameraAction';

export default class CameraReducer extends BaseReducer {
    initialState = {
        cameras: [],
        streams: [],
        camerasPageInfo: {
            currentPage: 0,
            totalItems: 0,
            totalPages: 0,
        },
    };

    [CameraAction.LIST_CAMERAS_FINISHED](state, action) {
        const response = action.payload.results;
        const pageInfo = {
            currentPage: response.currentPage,
            totalItems: response.totalItems,
            totalPages: response.totalPages,
        };

        return {
            ...state,
            cameras: response.results,
            camerasPageInfo: pageInfo,
        };
    }

    [CameraAction.LIST_STREAMS_FINISHED](state, action) {
        console.log(action);
        return {
            ...state,
            streams: action.payload.results,
        };
    }

}
