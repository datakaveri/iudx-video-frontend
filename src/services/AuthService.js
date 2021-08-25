import jwt from 'jwt-decode';

const getToken = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
        const tokenData = jwt(token);
        if (Date.now() >= tokenData.exp * 1000) {
            return null;
        }
        return token;
    }
    return null;
};

const setToken = (token) => {
    window.sessionStorage.setItem('token', token);
};

const removeToken = () => {
    window.sessionStorage.removeItem('token');
}

const decryptToken = (token) => {
    return jwt(token);
}

const AuthService = {
    getToken,
    setToken,
    decryptToken,
    removeToken,
};

export default AuthService;
