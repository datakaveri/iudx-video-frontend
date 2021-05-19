import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class ServerEffect {
    static async requestServers() {
        const endpoint = `${environment.api.server}/get-servers`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        let serverData = response.data;
        serverData = serverData.map((data) => {
            return {
                name: data.NAME,
                container: data.CONTAINER,
                running: false,
                disabled: false,
            };
        });
        return serverData;
    }
}
