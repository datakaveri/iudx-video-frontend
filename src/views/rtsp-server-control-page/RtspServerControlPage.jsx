import React, { useEffect, useState } from 'react';
import NavBar from '../shared/nav-bar/NavBar';
import { Tab, Tabs } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
};

const RtspControl = () => {
    const [rtspStreams, setRtspStreams] = useState([]);

    useEffect(() => {

        const updateRtspServerStatus = (data) => {
            if (data) {
                let streams = data;
                setRtspStreams(streams);
            }
        };

    }, []);

    return (
        <div>
            <NavBar />

            <Tabs>
                <Tab eventKey="home" title="Administration"></Tab>
                <Tab eventKey="profile" title="Monitoring">
                    <Container fluid style={{ marginTop: '20px' }}>
                        <Row>
                            <Col>
                                <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>RTSP Server</h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>No. of RTSP stream publishers</th>
                                            <th>No. of RTSP stream clients</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={tdStyle}>
                                                <h5>{rtspStreams.publishers}</h5>
                                            </td>
                                            <td style={tdStyle}>
                                                <h5>{rtspStreams.clients}</h5>
                                            </td>
                                        </tr>
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

export default RtspControl;
