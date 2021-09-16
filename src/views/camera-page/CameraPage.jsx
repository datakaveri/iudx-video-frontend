import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import NavBar from 'views/shared/nav-bar/NavBar';
import TablePagination from 'views/shared/table-pagination/TablePagination';
import ListDropdown from 'views/shared/dropdown/ListDropdown';
import CameraDetailsModal from 'views/camera-page/components/camera-details-modal/CameraDetailsModal';
import StreamsListModal from 'views/camera-page/components/Streams-list-modal/StreamsListModal';
import CameraAction from 'stores/camera/CameraAction';
import './CameraPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.router.location.state,
        cameras: state.cameraReducer.cameras,
        camerasPageInfo: state.cameraReducer.camerasPageInfo,
        streams: state.streamReducer.streams,
    };
};

const defaultRowsPerPage = 5;
const totalPageOnView = 5;
const isPaginationEnabled = false;

const CameraPage = (props) => {

    const { dispatch, cameras, camerasPageInfo, streams, state } = props;

    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    useEffect(() => {
        if (state && state.serverId) {
            dispatch(CameraAction.listCameras({ page: 1, size: rowsPerPage, serverId: state.serverId }));
        }
        else {
            dispatch(push('/'));
        }
    }, [dispatch, state, rowsPerPage]);

    const handlePageClick = async (e, index) => {
        e.preventDefault();
        dispatch(CameraAction.listCameras({ page: index, size: rowsPerPage, serverId: state.serverId }));
    }

    return (
        <div className="root-container">
            <NavBar />

            <div className="camera-container">

                <div className="table-header">
                    <h4 className="title">Registered Cameras</h4>
                </div>
                <div className="content-border" />
                {
                    Array.isArray(cameras) && cameras.length > 0 ? (
                        <div className="table-container">

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
                                                <CameraDetailsModal
                                                    title={"Camera Details"}
                                                    camera={camera}
                                                />
                                            </td>
                                            <td>
                                                <StreamsListModal
                                                    title={"Available Streams"}
                                                    streams={streams}
                                                    camera={camera}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) :
                        <div className="no-records">
                            <h5>No cameras to display</h5>
                        </div>
                }
                {isPaginationEnabled && (
                    <>
                        <div className="content-border" />
                        <div className="table-footer">
                            <ListDropdown
                                text={"Rows per page"}
                                btnColor={"primary"}
                                defaultItemText={rowsPerPage}
                                list={[5, 10, 15, 20]}
                                onItemSelectHandler={(itemValue) => setRowsPerPage(itemValue)}
                            />

                            <TablePagination className="pagination"
                                totalPages={camerasPageInfo.totalPages}
                                currentPage={camerasPageInfo.currentPage}
                                handlePageClick={handlePageClick}
                                totalPageOnView={totalPageOnView}
                            />
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default connect(mapStateToProps)(CameraPage);
