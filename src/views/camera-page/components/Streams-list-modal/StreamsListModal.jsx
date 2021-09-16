import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import AuthService from 'services/AuthService';
import StreamAction from 'stores/stream/StreamAction';
import ActionIconButton from 'views/shared/button/ActionIconButton';
import ModalComponent from 'views/shared/modal/Modal';
import { showNotification } from 'views/shared/notification/Notification';
import ListDropdown from 'views/shared/dropdown/ListDropdown';

import './StreamsListModal.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        streams: state.streamReducer.streams,
    };
};

const StreamsListModal = (props) => {
    const { title, streams, camera, dispatch } = props;

    const [newStreams, setNewStreams] = useState([]);

    useEffect(() => {
        if (Array.isArray(streams)) {
            setNewStreams(streams.map(stream => {
                return {
                    ...stream,
                    requestType: 'local'
                }
            }));
        }
    }, [streams]);

    const requestStream = (streamId, requestType, callback) => {
        dispatch(StreamAction.requestStream(streamId, requestType)).then(() => {
            callback();
            showNotification('deafult', 'Success', 'Stream request placed. Please check the status of the stream later');
        });
    };

    const copyToClipboard = (url, callback) => {
        let text = `ffplay ${url.replace("<TOKEN>", AuthService.getToken())}`
        navigator.clipboard.writeText(text);

        setTimeout(() => {
            callback()
        }, 5000);
    }

    const getStreams = (callback) => {
        dispatch(StreamAction.getStreams(camera.cameraId)).then(() => {
            callback();
        });
    }

    const updateNewStreams = (key, item, value) => {
        let updatedStreams = [...newStreams];
        updatedStreams[key][item] = value;
        setNewStreams(updatedStreams);
    }

    return (
        <ModalComponent btn={"Show Streams"} title={title} size={'lg'} className="modal-container" scrollable={true} onClickHandler={(callback) => getStreams(callback)}>
            {Array.isArray(newStreams) && newStreams.length > 0 ? (
                <Table bordered hover className="stream-list-table">
                    <thead>
                        <tr>
                            <th>Stream Name</th>
                            <th>Stream Type</th>
                            <th>Is Active</th>
                            <th>Request Type</th>
                            <th>Stream Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newStreams.map((stream, i) => (
                                <tr key={i}>
                                    <td>{stream.streamName}</td>
                                    <td>{stream.streamType}</td>
                                    <td>
                                        <div className="stream-status-container">{stream.isActive ? <span className="green-circle"></span> : <span className="red-circle"></span>}</div>
                                    </td>
                                    <td>
                                        <ListDropdown
                                            defaultItemText={stream.requestType}
                                            list={['local', 'cloud']}
                                            onItemSelectHandler={(itemValue) => {
                                                updateNewStreams(i, 'requestType', itemValue)
                                            }}
                                            disabled={stream.playbackUrlTemplate ? true : false}
                                        />
                                    </td>
                                    <td className="td-stream-column">
                                        {(stream.playbackUrlTemplate) ? (
                                            <ActionIconButton
                                                btnText="Copy Play Command"
                                                btnAfterText="Copied"
                                                onClickHandler={(callback) => {
                                                    copyToClipboard(stream.playbackUrlTemplate, callback)
                                                }}
                                                actionType="copy"
                                            />
                                        ) : (
                                            <ActionIconButton
                                                btnText="Stream Request"
                                                btnAfterText="Requesting"
                                                onClickHandler={(callback) => {
                                                    requestStream(stream.streamId, stream.requestType, callback);
                                                }}
                                                actionType="loading"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            ) : (
                <div className="stream-list-empty">No streams found</div>
            )}

        </ModalComponent>
    );
};

export default connect(mapStateToProps)(StreamsListModal);
