import RoutingEffect from './RoutingEffect';
import ActionUtility from '../../utilities/ActionUtility';

export default class RoutingAction {
    static ADD_ROUTING_DATA = 'RoutingAction.ADD_ROUTING_DATA';
    static ADD_ROUTING_DATA_FINISHED = 'RoutingAction.ADD_ROUTING_DATA_FINISHED';

    static REMOVE_ROUTING_DATA = 'RoutingAction.REMOVE_ROUTING_DATA';
    static REMOVE_ROUTING_DATA_FINISHED = 'RoutingAction.REMOVE_ROUTING_DATA_FINISHED';

    static REQUEST_PUBLISHING_STREAMS = 'RoutingAction.REQUEST_PUBLISHING_STREAMS';
    static REQUEST_PUBLISHING_STREAMS_FINISHED = 'RoutingAction.REQUEST_PUBLISHING_STREAMS_FINISHED';

    static ROUTING_START = 'RoutingAction.ROUTING_START';
    static ROUTING_START_FINISHED = 'RoutingAction.ROUTING_START_FINISHED';

    static ROUTING_STOP = 'RoutingAction.ROUTING_STOP';
    static ROUTING_STOP_FINISHED = 'RoutingAction.ROUTING_STOP_FINISHED';

    static addRoutingData(data) {
        return {
            type: RoutingAction.ADD_ROUTING_DATA,
            data: data,
        };
    }

    static removeRoutingData(data) {
        return {
            type: RoutingAction.REMOVE_ROUTING_DATA,
            data: data,
        };
    }

    static requestPublishingStreams() {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, RoutingAction.REQUEST_PUBLISHING_STREAMS, RoutingEffect.requestPublishingStreams);
        };
    }

    static startRouting(routingData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, RoutingAction.ROUTING_START, RoutingEffect.startRouting, routingData);
        };
    }

    static stopRouting(routingData) {
        return async (dispatch, getState) => {
            await ActionUtility.createThunkEffect(dispatch, RoutingAction.ROUTING_STOP, RoutingEffect.stopRouting, routingData);
        };
    }
}
