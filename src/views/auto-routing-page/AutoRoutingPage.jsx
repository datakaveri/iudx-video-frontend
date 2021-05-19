import React, { useState, useEffect } from 'react';
import NavBar from '../shared/nav-bar/NavBar';
import ListFilesModal from '../shared/modal/ListFilesModal';
import { Row, Col, Form, Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import RoutingAction from '../../stores/routing/RoutingAction';

const mapStateToProps = (state, ownProps) => {
    return {
        nginxStreams: state.serverReducer.nginxStreams,
        rtspStreams: state.serverReducer.rtspStreams,
        routingData: state.routingReducer.routingData,
    };
};

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
};

const AutoRoutingPage = (props) => {
    const { dispatch, nginxStreams, rtspStreams, routingData } = props;

    const [serverValue, setServerValue] = useState('RTMP Stream');

    const [urlValue, setUrlValue] = useState('');

    const [streamName, setStreamName] = useState('');

    const [streamNamePresent, setStreamNamePresent] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const initCheckBox = [
        { name: 'RTMP', checked: false, disabled: true },
        { name: 'RTSP', checked: true, disabled: true },
        { name: 'KMS', checked: true, disabled: false },
    ];

    const [selectedData, setSelectedData] = useState(initCheckBox);

    useEffect(() => {
        dispatch(RoutingAction.requestPublishingStreams());
    }, [dispatch]);

    const handleServerName = (e) => {
        setServerValue(e);
        let data = [...selectedData];
        if (e === 'RTMP Stream') {
            data[0].checked = false;
            data[1].checked = true;
            data[1].disabled = false;
            data[0].disabled = true;
        } else {
            data[0].checked = true;
            data[1].checked = false;
            data[0].disabled = false;
            data[1].disabled = true;
        }
        setSelectedData(data);
        setUrlValue('');
    };

    const validateStreamName = (val) => {
        let streamPresent;

        if (serverValue === 'RTMP Stream' && Array.isArray(rtspStreams.streams)) {
            streamPresent = rtspStreams.streams.some((element) => element.streamName === val);
        } else if (Array.isArray(nginxStreams)) {
            streamPresent = nginxStreams.some((element) => element.streamName === val);
        }
        if (streamPresent) {
            setStreamNamePresent(true);
        } else {
            setStreamNamePresent(false);
        }
    };

    const handleStreamChange = (e) => {
        const val = e.target.value;
        setStreamName(val);
        validateStreamName(val);
    };

    const handleServerChange = (e, index) => {
        let data = [...selectedData];
        if (serverValue === 'RTMP Stream' && index === 2) {
            if (e.target.checked) {
                data[1].checked = data[1].disabled = true;
            } else {
                data[1].checked = data[1].disabled = false;
            }
        }
        data[index].checked = e.target.checked;
        setSelectedData(data);
    };

    const getStreamUrl = () => {
        let data;
        if (serverValue === 'RTMP Stream' && Array.isArray(nginxStreams)) {
            data = nginxStreams.find((element) => element.streamName === urlValue);
        } else if (Array.isArray(rtspStreams.streams)) {
            data = rtspStreams.streams.find((element) => element.streamName === urlValue);
        }
        return data && data.url;
    };

    const handleUrlChange = (e) => {
        setUrlValue(e);
        validateStreamName(streamName);
    };

    const getSelectedServers = () => {
        let selectedServers = [];

        if (serverValue === 'RTSP Stream') {
            if (selectedData[0].checked) {
                selectedServers.push('nginx-rtmp');
            }
        } else if (selectedData[1].checked) {
            selectedServers.push('rtsp');
        }
        if (selectedData[2].checked) {
            selectedServers.push('kms');
        }

        return selectedServers;
    };

    const resetInputData = () => {
        setServerValue('RTMP Stream');
        setUrlValue('');
        setStreamName('');
        setSelectedData(initCheckBox);
    };

    const copyToClipboard = (e) => {
        e.target.select();
        document.execCommand('copy');
    };

    const startRouting = async () => {
        const data = {
            inputType: serverValue === 'RTMP Stream' ? 'rtmp' : 'rtsp',
            url: getStreamUrl(),
            options: getSelectedServers(),
            streamName: streamName,
        };

        if (!data.url || !data.streamName || streamNamePresent || data.options.length === 0) return;

        resetInputData();
        dispatch(RoutingAction.startRouting(data));
    };

    const stopRouting = async (streamData) => {
        const data = {
            id: streamData.pid,
            type: streamData.type,
            streamName: streamData.streamName,
        };
        dispatch(RoutingAction.stopRouting(data));
    };

    return (
        <div>
            <NavBar />
            <ListFilesModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={'Available Streams'}
                list={
                    serverValue === 'RTMP Stream'
                        ? Array.isArray(nginxStreams) &&
                          nginxStreams.map((data) => {
                              return data.streamName;
                          })
                        : Array.isArray(rtspStreams.streams) &&
                          rtspStreams.streams.map((data) => {
                              return data.streamName;
                          })
                }
                onSelect={(data) => handleUrlChange(data)}
            />
            <Row style={{ margin: '50px' }} xs={4}>
                <Col>
                    <DropdownButton variant="info" id="dropdown-basic-button" title={serverValue} onSelect={(e) => handleServerName(e)}>
                        <Dropdown.Item eventKey="RTMP Stream">RTMP Stream</Dropdown.Item>
                        <Dropdown.Item eventKey="RTSP Stream">RTSP Stream</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <Row>
                        <Button variant="info" onClick={() => setModalShow(true)}>
                            Select a Stream
                        </Button>
                    </Row>
                    <Row>{urlValue && <span>{urlValue} is selected</span>}</Row>
                </Col>
                <Col>
                    <Form.Control style={{ width: '90%' }} type="text" value={streamName} placeholder="Stream name" onChange={handleStreamChange} />
                    {streamNamePresent && <Form.Text style={{ color: 'red' }}>*Stream Name already taken</Form.Text>}
                </Col>
                <Col>
                    <Form.Group>
                        {Array.isArray(selectedData) &&
                            selectedData.map((data, i) => (
                                <Form.Check key={i} type="checkbox" disabled={data.disabled} label={`${data.name} Server`} checked={data.checked} onChange={(e) => handleServerChange(e, i)} />
                            ))}
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={startRouting}>
                                Start routing
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Stream Name</th>
                        <th>Output Url</th>
                        <th>Routing Status</th>
                        <th>Stop Routing</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(routingData) &&
                        routingData.map((data, i) => (
                            <tr key={i}>
                                <td>
                                    <h5>{data.type}</h5>
                                </td>
                                <td>
                                    <h5>{data.streamName}</h5>
                                </td>
                                <td>
                                    <Form.Control plaintext readOnly defaultValue={data.url} onFocus={copyToClipboard} />
                                </td>
                                <td>
                                    <h5>publishing</h5>
                                </td>
                                <td style={tdStyle}>
                                    <Button variant="danger" onClick={() => stopRouting(data)}>
                                        STOP
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(AutoRoutingPage);
