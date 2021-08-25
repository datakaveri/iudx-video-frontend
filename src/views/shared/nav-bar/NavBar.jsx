import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import AuthAction from '../../../stores/auth/AuthAction';

import './NavBar.scss';
import logo from '../../../assets/images/IUDX-logo.png';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authReducer.user,
    };
};

const NavBar = (props) => {
    const { dispatch, user } = props;

    const logout = () => {
        dispatch(AuthAction.logoutUser()).then(() => {
            dispatch(push('/login'));
        });
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light navbar-expand">
                <Link to={'/'} className="navbar-brand">
                    <img className="logo-style" src={logo} alt="Admin" />
                    IUVDX Admin
                </Link>

                {user && user.role === 'cms-admin' && <Link to="/admin" className="nav-item nav-link">Admin</Link>}

                {props.logout && (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={'/login'} className="nav-link" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    );
};

NavBar.defaultProps = {
    logout: true,
};

export default connect(mapStateToProps)(NavBar);
