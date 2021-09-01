import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';

import NavBar from 'views/shared/nav-bar/NavBar';
import TablePagination from 'views/shared/table-pagination/TablePagination';
import CameraDetailsModal from 'views/dashboard-page/components/camera-details-modal/CameraDetailsModal';
import StreamsListModal from 'views/dashboard-page/components/Streams-list-modal/StreamsListModal';
import CameraAction from 'stores/camera/CameraAction';
import './DashboardPage.scss';
import StreamAction from 'stores/stream/StreamAction';

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.authReducer.token,
        cameras: state.cameraReducer.cameras,
        camerasPageInfo: state.cameraReducer.camerasPageInfo,
        streams: state.streamReducer.streams,
    };
};

const defaultPageItemSize = 3;
const totalPageOnView = 5;

const Dashboard = (props) => {

    const { dispatch, cameras, camerasPageInfo, streams } = props;

    const [showCameraDetailsModal, setShowCameraDetailsModal] = useState(false);

    const [showStreamsListModal, setshowStreamsListModal] = useState(false);

    const [selectedCameraData, setSelectedCameraData] = useState({});

    useEffect(() => {
        dispatch(CameraAction.listCameras({ page: 1, size: defaultPageItemSize }));
    }, [dispatch]);

    const handlePageClick = async (e, index) => {
        e.preventDefault();
        dispatch(CameraAction.listCameras({ page: index, size: defaultPageItemSize }));
    }

    const handleCameraDetailsClick = (camera) => {
        setSelectedCameraData(camera);
        setShowCameraDetailsModal(true);
    }

    const handleStreamsListClick = (cameraId) => {
        dispatch(StreamAction.getStreams(cameraId));
        setshowStreamsListModal(true);
    }

    return (
        <div>
            <NavBar />

            <CameraDetailsModal
                show={showCameraDetailsModal}
                setIsShowing={setShowCameraDetailsModal}
                title={"Camera Details"}
                camera={selectedCameraData}
            />

            <StreamsListModal
                show={showStreamsListModal}
                setIsShowing={setshowStreamsListModal}
                title={"Available Streams"}
                streams={streams}
            />

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
                        <th>Camera Number</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Details</th>
                        <th>Streams</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(cameras) &&
                        cameras.map((camera, i) => (
                            <tr key={i}>
                                <td>{camera.cameraNum}</td>
                                <td>{camera.cameraName}</td>
                                <td>{camera.location}</td>
                                <td className="td-stream-column">
                                    <Button color="info" onClick={() => handleCameraDetailsClick(camera)}>
                                        Show Details
                                    </Button>
                                </td>
                                <td className="td-stream-column">
                                    <Button color="info" onClick={() => handleStreamsListClick(camera.cameraId)}>
                                        Show Streams
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

        </div >
    );
};

export default connect(mapStateToProps)(Dashboard);
