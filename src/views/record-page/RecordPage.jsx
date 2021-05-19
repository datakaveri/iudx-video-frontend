import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import NavBar from '../shared/nav-bar/NavBar';
import RecordAction from '../../stores/recording/RecordAction';
import { connect } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
    return {
        nginxStreams: state.serverReducer.nginxStreams,
        recordsData: state.recordReducer.recordsData,
    };
};

const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
};

const Record = (props) => {
    const { dispatch, nginxStreams, recordsData } = props;

    const [tableRecordData, setTableRecordData] = useState([]);

    useEffect(() => {
        let tableData =
            Array.isArray(nginxStreams) &&
            nginxStreams.map((nginx, i) => {
                let data = Array.isArray(tableRecordData) && tableRecordData.find((e) => e.streamName === nginx.streamName);
                return {
                    streamName: nginx.streamName,
                    serverType: data ? data.serverType : 'RTMP Recording',
                    isRecording: data ? data.isRecording : false,
                };
            });
        setTableRecordData(tableData);

        // eslint-disable-next-line
    }, [nginxStreams]);

    const handleTypeChange = (i) => (type) => {
        const data = [...tableRecordData];
        data[i].serverType = type;
        setTableRecordData(data);
    };

    const parseType = (i) => {
        return tableRecordData[i].serverType === 'RTMP Recording' ? 'nginx-rtmp' : 'rtsp';
    };

    const changeRecordStatus = (i, status) => {
        const data = [...tableRecordData];
        data[i].isRecording = status;
        setTableRecordData(data);
    };

    const startRecord = (i) => {
        changeRecordStatus(i, true);
        const recordData = {
            type: parseType(i),
            stream_name: tableRecordData[i].streamName,
        };
        dispatch(RecordAction.startRecord(recordData));
    };

    const stopRecord = (i) => {
        changeRecordStatus(i, false);
        const recordData = {
            type: parseType(i),
            stream_name: tableRecordData[i].streamName,
        };
        dispatch(RecordAction.stopRecord(recordData));
    };

    return (
        <div>
            <NavBar />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Stream Available</th>
                        <th>Server Type</th>
                        <th>Status</th>
                        <th>Start/Stop Record</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRecordData &&
                        Array.isArray(tableRecordData) &&
                        tableRecordData.map((server, i) => (
                            <tr key={i}>
                                <td>
                                    <h5>{tableRecordData[i].streamName}</h5>
                                </td>
                                <td>
                                    <DropdownButton id="dropdown-basic-button" title={tableRecordData[i].serverType} onSelect={handleTypeChange(i)}>
                                        <Dropdown.Item eventKey="RTMP Recording">RTMP Recording</Dropdown.Item>
                                        <Dropdown.Item eventKey="RTSP Recording">RTSP Recording</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                                <td>{tableRecordData[i].isRecording ? <span>Recording started</span> : <span>Recording stopped</span>}</td>
                                <td style={tdStyle}>
                                    {tableRecordData[i].isRecording ? <Button onClick={() => stopRecord(i)}>STOP RECORDING</Button> : <Button onClick={() => startRecord(i)}>START RECORDING</Button>}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <h3 style={{ paddingTop: '20px' }}>Recording Details</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Streams Recorded</th>
                        <th>FileName</th>
                        <th>Recording Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsData &&
                        Array.isArray(recordsData) &&
                        recordsData.map((server, i) => (
                            <tr key={i}>
                                <td>
                                    <h5>{recordsData[i].streamName}</h5>
                                </td>
                                <td>
                                    <h5>{recordsData[i].filePath}</h5>
                                </td>
                                <td>
                                    <h5>{recordsData[i].status}</h5>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(Record);
