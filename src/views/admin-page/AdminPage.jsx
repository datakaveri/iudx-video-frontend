import React from 'react';
import { Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

import { config } from '../../config';
import NavBar from '../shared/nav-bar/NavBar';
import RouteEnum from '../../constants/RoutesEnum';

import './AdminPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
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

const Admin = (props) => {
    const { dispatch, nginxStreams, streamStatus } = props;

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

            <Row style={cardRowStyle}>
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
            <h4>Stream Status</h4>
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
            <h4>Nginx RTMP Server</h4>
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

        </div>
    );
};

export default connect(mapStateToProps)(Admin);
