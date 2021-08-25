const prod = {
    ENDPOINT: 'http://dev.video-server.iudx.io:4000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://dev.video-server.iudx.io:8080/stat',
};
const dev = {
    ENDPOINT: 'http://localhost:4000',
    KMS_SITE: 'https://dev.video-server.iudx.io/',
    NGINX_RTMP_STAT: 'https://localhost:8080/stat',
};
export const config = process.env.NODE_ENV === 'dev' ? dev : prod;
