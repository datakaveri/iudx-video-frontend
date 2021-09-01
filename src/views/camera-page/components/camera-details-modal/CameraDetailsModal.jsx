import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { CustomModal, CustomModalBody, CustomModalHeader, CustomModalFooter } from 'views/shared/modal/Modal';

const CameraDetailsModal = (props) => {
    const { title, camera } = props;

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Button color="info" onClick={() => setModalShow(true)}>
                Show Details
            </Button>

            <CustomModal
                isShowing={modalShow}
                setIsShowing={() => setModalShow(false)}
            >

                <CustomModalHeader> {title} </CustomModalHeader>

                <CustomModalBody>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td>Camera Number</td>
                                <td>{camera.cameraNum}</td>
                            </tr>
                            <tr>
                                <td>Camera Type</td>
                                <td>{camera.cameraType}</td>
                            </tr>
                            <tr>
                                <td>Camera Usage</td>
                                <td>{camera.cameraUsage}</td>
                            </tr>
                            <tr>
                                <td>Camera Orientation</td>
                                <td>{camera.cameraOrientation}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{camera.city}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CustomModalBody>

                <CustomModalFooter>
                    <Button color="secondary" onClick={() => setModalShow(false)}>Close</Button>
                </CustomModalFooter>

            </CustomModal>
        </div>
    );
}

export default CameraDetailsModal;
