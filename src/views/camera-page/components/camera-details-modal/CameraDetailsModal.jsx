import React from 'react';
import { Table } from 'reactstrap';
import ModalComponent from 'views/shared/modal/Modal';

const CameraDetailsModal = (props) => {
    const { title, camera } = props;

    return (
        <ModalComponent
            btn={"Show Details"}
            title={title}
        >
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

        </ModalComponent>
    );
}

export default CameraDetailsModal;
