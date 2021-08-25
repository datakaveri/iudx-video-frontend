import jwt from 'jwt-decode';

const getToken = () => {
    return window.sessionStorage.getItem('token');
};

const setToken = (token) => {
    window.sessionStorage.setItem('token', token);
};

const decryptToken = (token) => {
    return jwt(token);
}

const AuthService = {
    getToken,
    setToken,
    decryptToken,
};

export default AuthService;
