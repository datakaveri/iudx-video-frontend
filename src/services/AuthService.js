const getToken = () => {
    return window.sessionStorage.getItem('token');
};

const setToken = (token) => {
    window.sessionStorage.setItem('token', token);
};

const decryptToken = (token) => {
    return {};
}

const AuthService = {
    getToken,
    setToken,
    decryptToken,
};

export default AuthService;
