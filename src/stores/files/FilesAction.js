import FilesEffect from './FilesEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class FilesAction {
    static REQUEST_FILES = 'FilesAction.REQUEST_FILES';
    static REQUEST_FILES_FINISHED = 'FilesAction.REQUEST_FILES_FINISHED';

    static requestFiles() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, FilesAction.REQUEST_FILES, FilesEffect.requestFiles);
        };
    }
}
