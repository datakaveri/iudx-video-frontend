import environment from 'environment';
import AuthService from 'services/AuthService';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class AuthEffect {
    static async registerUser(data) {
        const endpoint = `${environment.api.server}/api/auth/signup`;

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

    static async logoutUser() {
        const endpoint = `${environment.api.server}/api/auth/logout`;
        
        const response = await HttpUtility.get(endpoint);
        
        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        AuthService.removeToken();

        return response;
    }
}
