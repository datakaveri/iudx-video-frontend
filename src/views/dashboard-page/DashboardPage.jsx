import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import NavBar from 'views/shared/nav-bar/NavBar';
import ServerAction from 'stores/servers/ServerAction';
import './DashboardPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        registeredServers: state.serverReducer.registeredServers,
    };
};

const Dashboard = (props) => {

    const { dispatch, registeredServers } = props;

    useEffect(() => {
        dispatch(ServerAction.listRegisteredServers());
    }, [dispatch]);

    const handleServerClick = (e, serverId) => {
        e.preventDefault();
        if (serverId) {
            dispatch(push('cameras', { serverId }));
        }
    }

    return (
        <div>
            <NavBar />

            <div className="server-container">

                <div className="header">
                    <p className="title">Find cameras by registered servers</p>
                </div>

                <div className="server-cards">
                    {
                        Array.isArray(registeredServers) && registeredServers.length > 0 ?
                            registeredServers.map((server, i) => (
                                <a className="card-a" key={i} onClick={(e) => handleServerClick(e, server.serverId)} href="/#">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>{server.serverName}</h5>
                                        </div>
                                    </div>
                                </a>
                            ))
                            : <h5>No servers to display</h5>
                    }
                </div>
            </div>
        </div >
    );
};

export default connect(mapStateToProps)(Dashboard);
