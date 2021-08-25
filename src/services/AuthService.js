import jwt from 'jwt-decode';

const getToken = () => {
    const token = window.sessionStorage.getItem('token');
    const tokenData = jwt(token);
    if (Date.now() >= tokenData.exp * 1000) {
        return null;
    }
    return token;
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
