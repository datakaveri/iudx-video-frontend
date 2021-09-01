import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class StreamEffect {
    static async getAllStreams(cameraId) {
        const endpoint = `${environment.api.server}/api/streams?cameraId=${cameraId}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        if (response.data && response.data.results && response.data.results.results) {
            return response.data.results.results;
        }
    }

    static async requestStream(streamId) {
        const endpoint = `${environment.api.server}/api/streams/request/${streamId}?type=cloud`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        console.log(response);
        return response.data.data;
    }
}
