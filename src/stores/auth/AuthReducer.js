import BaseReducer from '../../utilities/BaseReducer';
import AuthAction from './AuthAction';

export default class AuthReducer extends BaseReducer {
    initialState = {
        token: null,
        user: {},
    };

    [AuthAction.REGISTER_USER_FINISHED](state, action) {
        return {
            ...state,
        };
    }

    [AuthAction.LOGIN_USER_FINISHED](state, action) {
        console.log(action);
        return {
            ...state,
            token: action.payload.data.token,
        };
    }

    [AuthAction.LOGOUT_USER_FINISHED](state, action) {
        return {
            ...state,
            token: null,
        };
    }

    [AuthAction.USER_DATA](state, action) {
        return {
            ...state,
            user: action.payload,
        };
    }
}
