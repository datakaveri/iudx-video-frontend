import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import StreamAction from 'stores/stream/StreamAction';
import AuthService from 'services/AuthService';
import AuthAction from 'stores/auth/AuthAction';

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

const withAuth = (ComponentToProtect, isPrivatePath) =>
    connect(mapStateToProps)((props) => {
        const { dispatch, user } = props;

        const [loading, setLoading] = useState(true);

        const [redirectLogin, setRedirectLogin] = useState(false);

        const [newUser, setNewUser] = useState(user);

        useEffect(() => {
            const validateUser = async () => {
                try {
                    const token = AuthService.getToken();
                    let tokenData = null;

                    if (token) {
                        tokenData = AuthService.decryptToken(token);
                        dispatch(AuthAction.saveUser(tokenData));
                    } else {
                        setRedirectLogin(true);
                    }

                    if (tokenData && tokenData.userId) {
                        setNewUser(tokenData);
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

        if (loading) return null;

        if (redirectLogin) {
            return <Redirect to="/login" />;
        }

        if (isPrivatePath && newUser.role !== 'cms-admin') {
            return <Redirect to="/" />;
        }

        return (
            <>
                <ComponentToProtect />
            </>
        );
    });

export default withAuth;
