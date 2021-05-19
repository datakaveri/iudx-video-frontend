import React, { useState, useEffect } from 'react';
import NavBar from '../shared/nav-bar/NavBar';
import { DropdownButton, Dropdown, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import StreamAction from '../../stores/stream/StreamAction';
import ListFilesModal from '../shared/modal/ListFilesModal';

const mapStateToProps = (state, ownProps) => {
    return {
        recordFiles: state.streamReducer.recordFiles,
        streamsData: state.streamReducer.streamsData,
        nginxStreams: state.serverReducer.nginxStreams,
    };
};

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: '70px',
};

let tableId = 0;

const Stream = (props) => {
    const { dispatch, streamsData, nginxStreams, recordFiles } = props;

    const [modalData, setModalData] = useState({
        show: false,
        id: -1,
    });

    useEffect(() => {
        dispatch(StreamAction.requestRecordFiles());
    }, [dispatch]);

    const handleAddRow = () => {
        const streamData = {
            id: tableId,
            streamId: -1,
            fileName: '',
            serverType: 'RTMP Server',
            streamName: '',
            publishing: false,
        };
        tableId++;
        dispatch(StreamAction.addTableData(streamData));
    };

    const handleRemoveRow = (id) => {
        stopStream(id);
        dispatch(StreamAction.removeTableData(id));
    };

    const validateStreamData = (index) => {
        const { fileName, streamName } = streamsData[index];
        if (!fileName || !streamName) return false;
        const found = Array.isArray(nginxStreams) && nginxStreams.some((element) => element.streamName === streamName);
        return found;
    };

    const handleChange = (data, id, type) => {
        console.log(data, id, type);
        const dataChange = {
            id: id,
            value: data,
            type: type,
        };
        dispatch(StreamAction.updateTable(dataChange));
    };

    const startStream = async (index) => {
        if (validateStreamData(index)) {
            const { id, fileName, serverType, streamName } = streamsData[index];
            dispatch(StreamAction.startStream({ id, fileName, serverType, streamName }));
        }
    };

    const stopStream = async (index) => {
        const { id, streamId } = streamsData[index];
        if (streamId !== -1) {
            dispatch(StreamAction.stopStream({ id, streamId }));
        }
    };

    return (
        <div>
            <NavBar />
            <h4 style={{ marginTop: '50px', paddingLeft: '20px' }}>Stream file through Nginx RTMP/RTSP Server</h4>
            <Button className="float-right" style={{ marginRight: '100px' }} onClick={handleAddRow}>
                {' '}
                Add Stream
            </Button>
            <Table striped bordered hover style={tdStyle}>
                <thead>
                    <tr>
                        <th>File to Stream</th>
                        <th>Server Type</th>
                        <th>Stream Name</th>
                        <th>Stream Status</th>
                        <th>Publish Streams</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <ListFilesModal
                        show={modalData.show}
                        onHide={() => setModalData({ show: false, id: -1 })}
                        title={'Available Files'}
                        list={recordFiles}
                        onSelect={(data) => handleChange(data, modalData.id, 'FILE_NAME')}
                    />
                    {Array.isArray(streamsData) &&
                        streamsData.map((data, key) => (
                            <tr key={key} style={tdStyle}>
                                <td>
                                    <Row>
                                        <Col>
                                            <Button variant="info" onClick={() => setModalData({ show: true, id: data.id })}>
                                                Select a file
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>{data.fileName && <span>{data.fileName} is selected</span>}</Col>
                                    </Row>
                                </td>
                                <td>
                                    <DropdownButton variant="outline-primary" id="dropdown-basic-button" title={data.serverType} onSelect={(e) => handleChange(e, data.id, 'SERVER_TYPE')}>
                                        <Dropdown.Item eventKey="RTMP Server">RTMP Server</Dropdown.Item>
                                        <Dropdown.Item eventKey="RTSP Server">RTSP Server</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                                <td>
                                    <Form.Control type="text" value={data.streamName} placeholder="Enter stream name" onChange={(e) => handleChange(e.target.value, data.id, 'STREAM_NAME')} />
                                    {/* <Form.Text style={{ color: 'red' }}>
                                        *Stream Name already taken
                                    </Form.Text> */}
                                </td>
                                <td>{data.publishing ? <span>Publishing</span> : <span>Not publishing</span>}</td>
                                <td>{data.publishing ? <Button onClick={() => stopStream(key)}>Stop stream</Button> : <Button onClick={() => startStream(key)}>Start stream</Button>}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveRow(data.id)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(Stream);
