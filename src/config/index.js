const prod = {
    ENDPOINT: 'https://dev.video-server.iudx.io:5000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://dev.video-server.iudx.io:6002/stat',
};
const dev = {
    ENDPOINT: 'http://localhost:4000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://localhost:6002/stat',
};
export const config = process.env.NODE_ENV === 'dev' ? dev : prod;
