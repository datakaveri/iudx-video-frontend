import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class StreamEffect {
    static async getAllStreams(cameraId) {
        const endpoint = `${environment.api.server}/api/cameras/${cameraId}/streams`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async requestStream(streamId) {
        const endpoint = `${environment.api.server}/api/streams/request/${streamId}?type=cloud`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }
}
