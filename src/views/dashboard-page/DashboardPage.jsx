import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

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

    const formatDate = (datestring) => {
        return moment(datestring).format('LLL');
    }

    return (
        <div>
            <NavBar />

            <div className="server-container">

                <div className="table-header">
                    <h4 className="title">Registered Servers</h4>
                </div>
                <div className="content-border" />
                <div className="table-container">
                    {
                        Array.isArray(registeredServers) && registeredServers.length > 0 ? (

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Server Name</th>
                                        <th>Last Active Time</th>
                                        <th>Cameras</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredServers.map((server, i) => (
                                        <tr key={i}>
                                            <td>{server.serverName}</td>
                                            <td>{formatDate(server.lastPingTime)}</td>
                                            <td>
                                                <Button color="info" onClick={(e) => handleServerClick(e, server.serverId)}>
                                                    Show Cameras
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) :
                            <h5>No servers to display</h5>
                    }
                </div>
                

                {/* <div className="server-cards">
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
                </div> */}
            </div>
        </div >
    );
};

export default connect(mapStateToProps)(Dashboard);
