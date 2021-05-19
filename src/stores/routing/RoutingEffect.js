import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class RoutingEffect {
    static async requestPublishingStreams() {
        const endpoint = `${environment.api.server}/routing/get-data`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async startRouting(data) {
        const endpoint = `${environment.api.server}/routing/start`;

        const response = await HttpUtility.post(endpoint, data);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async stopRouting(data) {
        const endpoint = `${environment.api.server}/routing/stop`;

        const response = await HttpUtility.post(endpoint, data);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }
}
