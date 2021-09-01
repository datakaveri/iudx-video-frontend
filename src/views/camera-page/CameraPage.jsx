import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import NavBar from 'views/shared/nav-bar/NavBar';
import TablePagination from 'views/shared/table-pagination/TablePagination';
import CameraDetailsModal from 'views/camera-page/components/camera-details-modal/CameraDetailsModal';
import StreamsListModal from 'views/camera-page/components/Streams-list-modal/StreamsListModal';
import CameraAction from 'stores/camera/CameraAction';
import StreamAction from 'stores/stream/StreamAction';
import './CameraPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.router.location.state,
        cameras: state.cameraReducer.cameras,
        camerasPageInfo: state.cameraReducer.camerasPageInfo,
        streams: state.streamReducer.streams,
    };
};

const defaultPageItemSize = 5;
const totalPageOnView = 5;

const CameraPage = (props) => {

    const { dispatch, cameras, camerasPageInfo, streams, state } = props;

    const [showCameraDetailsModal, setShowCameraDetailsModal] = useState(false);

    const [showStreamsListModal, setshowStreamsListModal] = useState(false);

    const [selectedCameraData, setSelectedCameraData] = useState({});


    useEffect(() => {
        if (state && state.serverId) {
            dispatch(CameraAction.listCameras({ page: 1, size: defaultPageItemSize, serverId: state.serverId }));
        }
        else {
            dispatch(push('/'));
        }
    }, [dispatch, state]);

    const handlePageClick = async (e, index) => {
        e.preventDefault();
        dispatch(CameraAction.listCameras({ page: index, size: defaultPageItemSize, serverId: state.serverId }));
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

            <div className="camera-container">

                <div className="table-header">
                    <h4 className="title">Registered Cameras</h4>
                </div>
                <div className="content-border" />
                <div className="table">
                    {
                        Array.isArray(cameras) && cameras.length > 0 ? (

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
                                    {cameras.map((camera, i) => (
                                        <tr key={i}>
                                            <td>{camera.cameraNum}</td>
                                            <td>{camera.cameraName}</td>
                                            <td>{camera.location}</td>
                                            <td>
                                                <Button color="info" onClick={() => handleCameraDetailsClick(camera)}>
                                                    Show Details
                                                </Button>
                                            </td>
                                            <td>
                                                <Button color="info" onClick={() => handleStreamsListClick(camera.cameraId)}>
                                                    Show Streams
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) :
                            <h5>No cameras to display</h5>
                    }
                </div>
                <div className="content-border" />
                <div className="table-footer">
                    <TablePagination className="pagination"
                        totalPages={camerasPageInfo.totalPages}
                        currentPage={camerasPageInfo.currentPage}
                        handlePageClick={handlePageClick}
                        totalPageOnView={totalPageOnView}
                    />
                </div>
            </div>
        </div >
    );
};

export default connect(mapStateToProps)(CameraPage);
