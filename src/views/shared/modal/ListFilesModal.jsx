import { Modal, ListGroup } from 'react-bootstrap';

const ListFilesModal = (props) => {
    const list = props.list;

    const handleSelectItem = (data) => {
        props.onSelect(data);
        props.onHide();
    };

    return (
        <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                <ListGroup>
                    {Array.isArray(list) &&
                        list.map((data, i) => (
                            <ListGroup.Item key={i} eventKey={data} action onSelect={() => handleSelectItem(data)}>
                                {data}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default ListFilesModal;
