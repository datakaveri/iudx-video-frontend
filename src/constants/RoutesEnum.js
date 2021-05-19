const RoutesEnum = {
    Home: '/',
    Login: '/login',
    Register: '/register',
    Confirm: '/confirm/:confirmationCode',
    Record: '/record',
    Stream: '/stream',
    NginRtmpControl: '/nginx-rtmp-control',
    RtspServerControl: '/rtsp-control',
    AutoRouting: '/routing',
    FilesDownload: '/files',
};

export default Object.freeze(RoutesEnum);
