import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolKitProvider, { Search } from 'react-bootstrap-table2-toolkit';

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
    };
};

const defaultRowsPerPage = 5;
const totalPageOnView = 5;
const isPaginationEnabled = false;

const { SearchBar } = Search;

const CameraPage = (props) => {
    const { dispatch, cameras, camerasPageInfo, state } = props;

    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    useEffect(() => {
        if (state && state.serverId) {
            dispatch(CameraAction.listCameras({ page: 1, size: rowsPerPage, serverId: state.serverId }));
        } else {
            dispatch(push('/'));
        }
    }, [dispatch, state, rowsPerPage]);

    const handlePageClick = async (e, index) => {
        e.preventDefault();
        dispatch(CameraAction.listCameras({ page: index, size: rowsPerPage, serverId: state.serverId }));
    };

    const detailsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return <CameraDetailsModal title={'Camera Details'} camera={row} />;
    };

    const streamsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return <StreamsListModal title={'Available Streams'} camera={row} />;
    };

    const columns = [
        {
            dataField: 'junction',
            text: 'Junction',
            hidden: true,
        },
        {
            dataField: 'cameraNum',
            text: 'Camera Number',
        },
        {
            dataField: 'cameraName',
            text: 'Name',
        },
        {
            dataField: 'location',
            text: 'Location',
        },
        {
            dataField: 'details',
            text: 'Details',
            formatter: detailsFormatter,
        },
        {
            dataField: 'streams',
            text: 'Streams',
            formatter: streamsFormatter,
        },
    ];

    return (
        <div className="root-container">
            <NavBar />

            <div className="camera-container">
                <div className="table-header">
                    <h4 className="title">Registered Cameras</h4>
                </div>
                <div className="content-border" />
                {Array.isArray(cameras) && cameras.length > 0 ? (
                    <div className="table-container">
                        <ToolKitProvider keyField="cameraId" data={cameras} columns={columns} search>
                            {(props) => (
                                <div className="table-container-searchbar-table">
                                    <SearchBar {...props.searchProps} />
                                    <hr />
                                    <BootstrapTable {...props.baseProps} />
                                </div>
                            )}
                        </ToolKitProvider>
                    </div>
                ) : (
                    <div className="no-records">
                        <h5>No cameras to display</h5>
                    </div>
                )}
                {isPaginationEnabled && (
                    <>
                        <div className="content-border" />
                        <div className="table-footer">
                            <ListDropdown
                                text={'Rows per page'}
                                btnColor={'primary'}
                                defaultItemText={rowsPerPage}
                                list={[5, 10, 15, 20]}
                                onItemSelectHandler={(itemValue) => setRowsPerPage(itemValue)}
                            />

                            <TablePagination
                                className="pagination"
                                totalPages={camerasPageInfo.totalPages}
                                currentPage={camerasPageInfo.currentPage}
                                handlePageClick={handlePageClick}
                                totalPageOnView={totalPageOnView}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(CameraPage);
