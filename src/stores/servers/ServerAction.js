import ServerEffect from "./ServerEffect";
import ActionUtility from "utilities/ActionUtility";

export default class ServerAction {
    static LIST_REGISTERED_SERVERS = 'ServerAction.LIST_REGISTERED_SERVERS';
    static LIST_REGISTERED_SERVERS_FINISHED = 'ServerAction.LIST_REGISTERED_SERVERS_FINISHED';

    static listRegisteredServers() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, ServerAction.LIST_REGISTERED_SERVERS, ServerEffect.listRegisteredServers);
        };
    }

}
