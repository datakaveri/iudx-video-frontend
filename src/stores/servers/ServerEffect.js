import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import HttpUtility from 'utilities/HttpUtility';

export default class ServerEffect {

    static async listRegisteredServers() {
        const endpoint = `${environment.api.server}/api/server/`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }
}
