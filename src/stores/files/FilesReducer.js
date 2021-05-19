import BaseReducer from '../../utilities/BaseReducer';
import FilesAction from './FilesAction';

export default class FilesReducer extends BaseReducer {
    initialState = {
        files: [],
    };

    [FilesAction.REQUEST_FILES_FINISHED](state, action) {
        return {
            ...state,
            files: action.payload,
        };
    }
}
