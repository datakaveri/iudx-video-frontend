import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ServerAction from '../../stores/servers/ServerAction';
import SocketAction from '../../stores/socket/SocketAction';
import { connect } from 'react-redux';
import StreamAction from 'stores/stream/StreamAction';

const mapStateToProps = (state, ownProps) => {
    return {
        socketConnected: state.socketReducer.socketConnected,
    };
};

const withAuth = (ComponentToProtect) =>
    connect(mapStateToProps)((props) => {
        const { dispatch, socketConnected } = props;

        const [loading, setLoading] = useState(true);

        const [redirectLogin, setRedirectLogin] = useState(false);

        useEffect(() => {
            const validateUser = async () => {
                try {
                    const response = await axios.get('/validate-token');
                    if (response.status === 200) {
                        setLoading(false);
                    } else {
                        throw new Error(response.error);
                    }
                } catch (error) {
                    setRedirectLogin(true);
                    setLoading(false);
                }
            };

            validateUser();
        }, []);

        useEffect(() => {
            if (!(socketConnected || redirectLogin || loading)) {
                dispatch(SocketAction.connect());

                dispatch(ServerAction.containerStatusReceive());
                dispatch(ServerAction.nginxStatsReceive());
                dispatch(ServerAction.rtspServerStatsReceive());
                dispatch(StreamAction.streamStatusReceive());
            }
        }, [dispatch, socketConnected, loading, redirectLogin]);

        if (loading) return null;

        if (redirectLogin) {
            return <Redirect to="/login" />;
        }

        return (
            <>
                <ComponentToProtect />
            </>
        );
    });

export default withAuth;
