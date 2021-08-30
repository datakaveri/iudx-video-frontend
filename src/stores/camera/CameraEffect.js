import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class CameraEffect {
    static async listCameras(requestParams) {
        const { page, size } = requestParams;

        const endpoint = `${environment.api.server}/api/cameras?page=${page}&size=${size}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async listStreamsByCamera(requestParams) {
        const { cameraId } = requestParams;

        const endpoint = `${environment.api.server}/api/cameras/${cameraId}/streams`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }
}
