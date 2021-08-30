import React from 'react';
import { Table, Button } from 'reactstrap';
import { CustomModal, CustomModalBody, CustomModalHeader, CustomModalFooter } from 'views/shared/modal/Modal';

const CameraDetailsModal = (props) => {
    const { title, camera } = props;

    return (
        <CustomModal
            isShowing={props.show}
            setIsShowing={() => props.setIsShowing(false)}
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
                <Button color="secondary" onClick={() => props.setIsShowing(false)}>Close</Button>
            </CustomModalFooter>

        </CustomModal>
    );
}

export default CameraDetailsModal;
