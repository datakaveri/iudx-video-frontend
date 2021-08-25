import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ServerAction from '../../stores/servers/ServerAction';
import { connect } from 'react-redux';
import StreamAction from 'stores/stream/StreamAction';
import AuthService from 'services/AuthService';
import AuthAction from 'stores/auth/AuthAction';

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

const withAuth = (ComponentToProtect) =>
    connect(mapStateToProps)((props) => {
        const { dispatch, user } = props;

        const [loading, setLoading] = useState(true);

        const [redirectLogin, setRedirectLogin] = useState(false);

        useEffect(() => {
            const validateUser = async () => {
                try {
                    const token = AuthService.getToken();
                    if (token) {
                        let tokenData = AuthService.decryptToken(token);
                        dispatch(AuthAction.saveUser(tokenData));
                    }
                    if (user && user.userId) {
                        setLoading(false);
                    } else {
                        throw new Error('Login required');
                    }
                } catch (error) {
                    setRedirectLogin(true);
                    setLoading(false);
                }
            };

            validateUser();
        }, []);

        useEffect(() => {
            if (!(redirectLogin || loading)) {
                dispatch(ServerAction.nginxStatsReceive());
                dispatch(ServerAction.rtspServerStatsReceive());
                dispatch(StreamAction.streamStatusReceive());
            }
        }, [dispatch, loading, redirectLogin]);

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
