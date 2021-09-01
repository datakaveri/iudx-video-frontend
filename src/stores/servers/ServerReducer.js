import BaseReducer from '../../utilities/BaseReducer';
import ServerAction from './ServerAction';

export default class ServerReducer extends BaseReducer {
    initialState = {
        registeredServers: [],
    };

    [ServerAction.LIST_REGISTERED_SERVERS_FINISHED](state, action) {
        return {
            ...state,
            registeredServers: action.payload,
        };
    }
}
