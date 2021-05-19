import RecordEffect from './RecordEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class RecordAction {
    static RECORD_START = 'RecordAction.RECORD_START';
    static RECORD_START_FINISHED = 'RecordAction.RECORD_START_FINISHED';

    static RECORD_STOP = 'RecordAction.RECORD_STOP';
    static RECORD_STOP_FINISHED = 'RecordAction.RECORD_STOP_FINISHED';

    static startRecord(recordData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, RecordAction.RECORD_START, RecordEffect.startRecord, recordData);
        };
    }

    static stopRecord(recordData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, RecordAction.RECORD_STOP, RecordEffect.stopRecord, recordData);
        };
    }
}
