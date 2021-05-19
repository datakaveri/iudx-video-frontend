import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthAction from '../../../stores/auth/AuthAction';
import SocketAction from '../../../stores/socket/SocketAction';

import logo from '../../../assets/images/IUDX-logo.png';

const logoStyle = {
    maxWidth: '135px',
    maxHeight: '40px',
    marginRight: '10px',
};

const NavBar = (props) => {
    const { dispatch } = props;

    const logout = () => {
        dispatch(SocketAction.disconnect());
        dispatch(AuthAction.logoutUser({ withCredentials: true }));
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light navbar-expand">
                <Link to={'/'} className="navbar-brand">
                    <img style={logoStyle} src={logo} alt="Admin" />
                    IUVDX Admin
                </Link>

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

export default connect()(NavBar);
