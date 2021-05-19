import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';

export default class StreamEffect {
    static async requestRecordFiles() {
        const endpoint = `${environment.api.server}/get-stream-files`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return response.data;
    }

    static async startStream(streamData) {
        const { id, fileName, serverType, streamName } = streamData;

        const type = serverType === 'RTMP Server' ? 'nginx-rtmp' : 'rtsp';

        const endpoint = `${environment.api.server}/stream/start?filename=${fileName}&server_type=${type}&stream_name=${streamName}`;
        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        const data = {
            id: id,
            data: response.data,
        };

        return data;
    }

    static async stopStream(streamData) {
        const { id, streamId } = streamData;

        const endpoint = `${environment.api.server}/stream/stop?streamid=${streamId}`;

        const response = await HttpUtility.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return { id };
    }
}
