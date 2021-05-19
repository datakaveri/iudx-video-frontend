import BaseReducer from '../../utilities/BaseReducer';
import RoutingAction from './RoutingAction';

export default class RoutingReducer extends BaseReducer {
    initialState = {
        routingData: [],
    };

    [RoutingAction.REQUEST_PUBLISHING_STREAMS_FINISHED](state, action) {
        return {
            ...state,
            routingData: action.payload,
        };
    }

    [RoutingAction.ROUTING_START_FINISHED](state, action) {
        return {
            ...state,
            routingData: [...state.routingData, ...action.payload],
        };
    }

    [RoutingAction.ROUTING_STOP_FINISHED](state, action) {
        return {
            ...state,
            routingData: state.routingData.filter((data) => data.streamName !== action.payload.streamName || data.pid !== action.payload.pid),
        };
    }
}
