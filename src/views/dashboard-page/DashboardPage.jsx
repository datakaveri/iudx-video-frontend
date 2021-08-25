import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';

import NavBar from '../shared/nav-bar/NavBar';
import TablePagination from '../shared/table-pagination/TablePagination';
import CameraAction from '../../stores/camera/CameraAction';
import './DashboardPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.authReducer.token,
        cameras: state.cameraReducer.cameras,
        camerasPageInfo: state.cameraReducer.camerasPageInfo,
    };
};

const defaultPageItemSize = 5;
const totalPageOnView = 5;

const Dashboard = (props) => {

    const { dispatch, cameras, camerasPageInfo } = props;

    const handlePageClick = async (e, index) => {
        e.preventDefault();
        dispatch(CameraAction.listCameras({ page: index, size: defaultPageItemSize }));
    }

    useEffect(() => {
        dispatch(CameraAction.listCameras({ page: 1, size: defaultPageItemSize }));
    }, [dispatch]);


    return (
        <div>
            <NavBar />
            <div className="table-wrapper">
                <h4 >Registered Cameras</h4>
                <TablePagination
                    totalPages={camerasPageInfo.totalPages}
                    currentPage={camerasPageInfo.currentPage}
                    handlePageClick={handlePageClick}
                    totalPageOnView={totalPageOnView}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Usage</th>
                        <th>Orientation</th>
                        <th>City</th>
                        <th>Location</th>
                        <th>Streams</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(cameras) &&
                        cameras.map((camera, i) => (
                            <tr key={i}>
                                <td>{camera.cameraNum}</td>
                                <td>{camera.cameraName}</td>
                                <td>{camera.cameraType}</td>
                                <td>{camera.cameraUsage}</td>
                                <td>{camera.cameraOrientation}</td>
                                <td>{camera.city}</td>
                                <td>{camera.location}</td>
                                <td className="td-stream-column">
                                    <Button color="info" onClick={() => { }}>
                                        Streams
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(Dashboard);
