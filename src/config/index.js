const prod = {
    ENDPOINT: 'https://dev.video-server.iudx.io:4000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://dev.video-server.iudx.io:6002/stat',
    RTSP_SERVER_STAT: 'http://dev.video-server.iudx.io:9998/metrics',
};
const dev = {
    ENDPOINT: 'http://localhost:4000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://localhost:6002/stat',
    RTSP_SERVER_STAT: 'http://localhost:9998/metrics',
};
export const config = process.env.NODE_ENV === 'dev' ? dev : prod;
