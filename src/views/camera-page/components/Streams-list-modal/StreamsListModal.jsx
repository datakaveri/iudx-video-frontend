import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import AuthService from 'services/AuthService';
import StreamAction from 'stores/stream/StreamAction';
import ActionIconButton from 'views/shared/button/ActionIconButton';
import { CustomModal, CustomModalBody, CustomModalHeader, CustomModalFooter } from 'views/shared/modal/Modal';
import { showNotification } from 'views/shared/notification/Notification';

import './StreamsListModal.scss';

const StreamsListModal = (props) => {
    const { title, streams, dispatch } = props;

    const requestStream = (streamId, callback) => {
        dispatch(StreamAction.requestStream(streamId)).then(() => {
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

    return (
        <CustomModal isShowing={props.show} setIsShowing={() => props.setIsShowing(false)} size={'lg'} className="modal-container" scrollable={true}>
            <CustomModalHeader> {title} </CustomModalHeader>

            <CustomModalBody>
                {Array.isArray(streams) && streams.length > 0 ? (
                    <Table bordered hover className="stream-list-table">
                        <thead>
                            <tr>
                                <th>Stream Name</th>
                                <th>Stream Type</th>
                                <th>Is Active</th>
                                <th>Is Publishing</th>
                                <th>Stream Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(streams) &&
                                streams.map((stream, i) => (
                                    <tr key={i}>
                                        <td>{stream.streamName}</td>
                                        <td>{stream.streamType}</td>
                                        <td>
                                            <div className="stream-status-container">{stream.isActive ? <span className="green-circle"></span> : <span className="red-circle"></span>}</div>
                                        </td>
                                        <td>
                                            <div className="stream-status-container">{stream.isPublishing ? <span className="green-circle"></span> : <span className="red-circle"></span>}</div>
                                        </td>
                                        <td className="td-stream-column">
                                            {(stream.isPublishing && stream.urlTemplate) ? (
                                                <ActionIconButton 
                                                    btnText="Copy Play Command"
                                                    btnAfterText="Copied"
                                                    onClickHandler={(callback) => {
                                                        copyToClipboard(stream.urlTemplate, callback)
                                                    }}
                                                    actionType="copy"
                                                />
                                            ) : (
                                                <ActionIconButton
                                                    btnText="Stream Request"
                                                    btnAfterText="Requesting"
                                                    onClickHandler={(callback) => {
                                                        requestStream(stream.streamId, callback);
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
            </CustomModalBody>

            <CustomModalFooter>
                <Button color="secondary" onClick={() => props.setIsShowing(false)}>
                    Close
                </Button>
            </CustomModalFooter>
        </CustomModal>
    );
};

export default connect()(StreamsListModal);
