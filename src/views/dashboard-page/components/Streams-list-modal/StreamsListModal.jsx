import React from 'react';
import { Table, Button } from 'reactstrap';
import { CustomModal, CustomModalBody, CustomModalHeader, CustomModalFooter } from 'views/shared/modal/Modal';

import './StreamsListModal.scss';

const StreamsListModal = (props) => {
    const { title, streams } = props;

    return (
        <CustomModal
            isShowing={props.show}
            setIsShowing={() => props.setIsShowing(false)}
            size={"lg"}
            className="modal-container"
            scrollable={true}
        >

            <CustomModalHeader> {title} </CustomModalHeader>

            <CustomModalBody>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Stream Name</th>
                            <th>Stream Url</th>
                            <th>Stream Type</th>
                            <th>type</th>
                            <th>Stream Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(streams) &&
                            streams.map((stream, i) => (
                                <tr key={i}>
                                    <td>{stream.streamName}</td>
                                    <td>{stream.streamUrl}</td>
                                    <td>{stream.streamType}</td>
                                    <td>{stream.type}</td>
                                    <td className="td-stream-column">
                                        <Button color="info" onClick={() => { }}>
                                            Request Stream
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </CustomModalBody>

            <CustomModalFooter>
                <Button color="secondary" onClick={() => props.setIsShowing(false)}>Close</Button>
            </CustomModalFooter>

        </CustomModal>
    );
}

export default StreamsListModal;
