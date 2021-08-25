import AuthEffect from './AuthEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class AuthAction {
    static REGISTER_USER = 'AuthAction.REGISTER_USER';
    static REGISTER_USER_FINISHED = 'AuthAction.REGISTER_USER_FINISHED';

    static LOGIN_USER = 'AuthAction.LOGIN_USER';
    static LOGIN_USER_FINISHED = 'AuthAction.LOGIN_USER_FINISHED';

    static LOGOUT_USER = 'AuthAction.LOGOUT_USER';
    static LOGOUT_USER_FINISHED = 'AuthAction.LOGOUT_USER_FINISHED';

    static USER_DATA = 'AuthAction.USER_DATA';

    static registerUser(userData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, AuthAction.REGISTER_USER, AuthEffect.registerUser, userData);
        };
    }

    static loginUser(userData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, AuthAction.LOGIN_USER, AuthEffect.loginUser, userData);
        };
    }

    static logoutUser() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, AuthAction.LOGOUT_USER, AuthEffect.logoutUser);
        };
    }

    static saveUser(data) {
        return ActionUtility.createAction(AuthAction.USER_DATA, data);
    }
}
