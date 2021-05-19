import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FilesAction from 'stores/files/FilesAction';
import NavBar from '../shared/nav-bar/NavBar';
import { Table, Button } from 'react-bootstrap';
import './FilesDownloadPage.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        files: state.filesReducer.files,
    };
};

const FilesDownload = (props) => {
    const { dispatch, files } = props;

    useEffect(() => {
        dispatch(FilesAction.requestFiles());
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            <div className="table-container">
                <Table bordered hover className="table-container__table">
                    <thead className="table-container__table__header">
                        <tr>
                            <th>Thumbnail</th>
                            <th>File</th>
                            <th>Play</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody className="table-container__table__body">
                        {Array.isArray(files) &&
                            files.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={'data:image/jpg;base64,' + data.thumbnail} alt="Thumbnail" />
                                    </td>
                                    <td>{data.name}</td>
                                    <td>
                                        <Button variant="primary">
                                            <a className="buttonText" href={data.playUrl} target="_blank" rel="noopener noreferrer">
                                                Play
                                            </a>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="primary">
                                            <a className="buttonText" href={data.downloadUrl}>
                                                Download
                                            </a>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(FilesDownload);
