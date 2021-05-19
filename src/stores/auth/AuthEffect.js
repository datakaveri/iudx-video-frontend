import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class AuthEffect {
    static async registerUser(data) {
        const endpoint = `${environment.api.server}/register`;

        const response = await HttpUtility.post(endpoint, data);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response;
    }

    static async loginUser(data) {
        const endpoint = `${environment.api.server}/login`;

        const response = await HttpUtility.post(endpoint, data);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response;
    }

    static async logoutUser(data) {
        const endpoint = `${environment.api.server}/logout`;

        const response = await HttpUtility.post(endpoint, data);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response;
    }
}
