import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class RecordEffect {
    static async startRecord(data) {
        const { type, stream_name } = data;

        const endpoint = `${environment.api.server}/record/start?type=${type}&stream_name=${stream_name}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async stopRecord(data) {
        const { type, stream_name } = data;

        const endpoint = `${environment.api.server}/record/stop?type=${type}&stream_name=${stream_name}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }
}
