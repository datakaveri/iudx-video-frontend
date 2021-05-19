import React, { useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

import { config } from '../../config';
import NavBar from '../shared/nav-bar/NavBar';
import ServerAction from '../../stores/servers/ServerAction';
import RouteEnum from '../../constants/RoutesEnum';

import './DashboardPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        servers: state.serverReducer.servers,
        nginxStreams: state.serverReducer.nginxStreams,
        rtspStreams: state.serverReducer.rtspStreams,
        streamStatus: state.streamReducer.streamStatus,
    };
};

const cardRowStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
};

const cardStyle = {
    width: '17rem',
    marginLeft: '20px',
    marginTop: '10px',
};

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
};

const Dashboard = (props) => {
    const { dispatch, servers, nginxStreams, rtspStreams, streamStatus } = props;
    useEffect(() => {
        dispatch(ServerAction.requestServers());
    }, [dispatch]);

    const changeDisableStatus = (index, status) => {
        const updateServer = {
            index: index,
            disabled: status,
        };
        dispatch(ServerAction.updateServers(updateServer));
    };

    const start_Server = async (serverId) => {
        changeDisableStatus(serverId, true);

        const data = {
            serverName: servers[serverId].container,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            await axios.post('/start-server', data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const stop_Server = async (serverId) => {
        changeDisableStatus(serverId, true);

        const data = {
            serverName: servers[serverId].container,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            await axios.post('/stop-server', data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const copyToClipboard = (e) => {
        e.target.select();
        document.execCommand('copy');
    };

    const moveToPath = (path) => {
        dispatch(push(path));
    };

    return (
        <div>
            <NavBar />

            <Table striped bordered hover style={tdStyle}>
                <thead>
                    <tr>
                        <th>Server</th>
                        <th>Status</th>
                        <th>Start/Stop</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(servers) &&
                        servers.map((server, i) => (
                            <tr key={i}>
                                <td>
                                    <h5>{servers[i].name}</h5>
                                </td>
                                <td>
                                    {servers[i].running ? (
                                        servers[i].disabled ? (
                                            <span>Stopping the server...</span>
                                        ) : (
                                            <span>Server is running</span>
                                        )
                                    ) : servers[i].disabled ? (
                                        <span>Starting the server...</span>
                                    ) : (
                                        <span> Server is not running</span>
                                    )}
                                </td>
                                <td>
                                    {servers[i].running ? (
                                        <Button disabled={servers[i].disabled} onClick={() => stop_Server(i)}>
                                            STOP THE SERVER
                                        </Button>
                                    ) : (
                                        <Button disabled={servers[i].disabled} onClick={() => start_Server(i)}>
                                            START THE SERVER
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Row style={cardRowStyle}>
                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Nginx RTMP</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Detailed status</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.NginRtmpControl)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>RTSP Simple Server</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Detailed Status</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.RtspServerControl)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Kurento Application</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Openvidu</Card.Subtitle>
                        <Button onClick={() => window.open(config.KMS_SITE)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Stream files</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">RTMP/RTSP</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.Stream)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Record streams</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">RTMP/RTSP</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.Record)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Auto Routing</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">RTMP/RTSP/KMS</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.AutoRouting)}>Open</Button>
                    </Card.Body>
                </Card>

                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Download Files</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Recorded files</Card.Subtitle>
                        <Button onClick={() => moveToPath(RouteEnum.FilesDownload)}>Open</Button>
                    </Card.Body>
                </Card>
            </Row>
            <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>Stream Status</h4>
            <Table striped bordered hover style={tdStyle}>
                <thead>
                    <tr>
                        <th>Stream Name</th>
                        <th>City</th>
                        <th>Last Updated</th>
                        <th>Active</th>
                        <th>Publishing</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(streamStatus) &&
                        streamStatus.map((stream, i) => (
                            <tr key={i}>
                                <td>{stream.name}</td>
                                <td>{stream.city}</td>
                                <td>{moment(stream.updatedAt).format('YYYY-MM-DD h:mm:ss a')}</td>
                                <td>
                                    <div className="stream-activity-status-container">{stream.active ? <div className="green-circle"></div> : <div className="red-circle"></div>}</div>
                                </td>
                                <td>
                                    <div className="stream-activity-status-container">{stream.isPublishing ? <div className="green-circle"></div> : <div className="red-circle"></div>}</div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>Nginx RTMP Server</h4>
            <Table striped bordered hover style={tdStyle}>
                <thead>
                    <tr>
                        <th>Available RTMP streams</th>
                        <th>No. of clients connected</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(nginxStreams) &&
                        nginxStreams.map((stream, i) => (
                            <tr key={i}>
                                <td>
                                    <Form.Control plaintext readOnly defaultValue={nginxStreams[i].url} onFocus={copyToClipboard} />
                                </td>
                                <td>
                                    <h5>{nginxStreams[i].nclients}</h5>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>RTSP Server</h4>
            <Row>
                <Col style={{ paddingLeft: '35px' }}>
                    <h5>Total No. of publishers : {rtspStreams.publishers} </h5>
                </Col>
                <Col>
                    <h5>Total No. of Clients : {rtspStreams.clients} </h5>
                </Col>
            </Row>

            <Table striped bordered hover style={tdStyle}>
                <thead>
                    <tr>
                        <th>Available RTSP streams</th>
                        <th>No. of clients connected</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rtspStreams.streams) &&
                        rtspStreams.streams.map((stream, i) => (
                            <tr key={i}>
                                <td>
                                    <Form.Control plaintext readOnly defaultValue={rtspStreams.streams[i].url} onFocus={copyToClipboard} />
                                </td>
                                <td>
                                    <h5>{rtspStreams.streams[i].nClients}</h5>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(Dashboard);
