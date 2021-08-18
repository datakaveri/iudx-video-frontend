import React, { useEffect, useState } from 'react';
import NavBar from '../shared/nav-bar/NavBar';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { config } from '../../config';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
};

const NginxControl = (props) => {
    const { servers, setServers } = props;

    const [nginxStreams, setNginxStreams] = useState([]);

    const changeDisableStatus = (index, status) => {
        const updateServer = [...servers];
        updateServer[index].disabled = status;
        setServers(updateServer);
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
            let response = await axios.post('/start-server', data, { headers });
            console.log(response);
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
            let response = await axios.post('/stop-server', data, { headers });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        const updateNginxServerStatus = (data) => {
            let streams;
            if (data) {
                streams = data.server[0].application[0].live[0].stream;
            }

            if (streams) {
                streams = streams.map((stream) => {
                    return {
                        url: 'rtmp://' + window.location.hostname + ':6001/live/' + stream.name[0] + '?password=admin123',
                        nclients: stream.nclients[0] - 1,
                    };
                });
            }
            setNginxStreams(streams);
        };

    }, []);

    const copyToClipboard = (e) => {
        e.target.select();
        document.execCommand('copy');
    };

    return (
        <div>
            <NavBar />

            <Tabs>
                <Tab eventKey="home" title="Administration">
                    <Container fluid style={{ marginTop: '20px' }}>
                        <Row>
                            <Col md={{ span: 2, offset: 8 }}>
                                {servers &&
                                    (servers[0].running ? (
                                        servers[0].disabled ? (
                                            <span>Stopping the server...</span>
                                        ) : (
                                            <span>Server is running</span>
                                        )
                                    ) : servers[0].disabled ? (
                                        <span>Starting the server...</span>
                                    ) : (
                                        <span> Server is not running</span>
                                    ))}
                            </Col>
                            <Col>
                                {servers &&
                                    (servers[0].running ? (
                                        <Button disabled={servers[0].disabled} onClick={() => stop_Server(0)}>
                                            STOP THE SERVER
                                        </Button>
                                    ) : (
                                        <Button disabled={servers[0].disabled} onClick={() => start_Server(0)}>
                                            START THE SERVER
                                        </Button>
                                    ))}
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="profile" title="Monitoring">
                    <iframe src={config.NGINX_RTMP_STAT} title="nginx stat page" width="100%" height="500"></iframe>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>Nginx RTMP Server</h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Available RTMP streams</th>
                                            <th>No. of clients connected</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nginxStreams &&
                                            nginxStreams.map((stream, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <Form.Control plaintext readOnly defaultValue={nginxStreams[i].url} onFocus={copyToClipboard} />
                                                    </td>
                                                    <td style={tdStyle}>
                                                        <h5>{nginxStreams[i].nclients}</h5>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="contact" title="Viewing"></Tab>
            </Tabs>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        servers: state.servers,
    };
};

export default connect(mapStateToProps, null)(NginxControl);
