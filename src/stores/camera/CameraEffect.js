import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class CameraEffect {

    static async listCameras(requestParams) {
        const { page, size, serverId } = requestParams;

        const endpoint = `${environment.api.server}/api/cameras?serverId=${serverId}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

}
