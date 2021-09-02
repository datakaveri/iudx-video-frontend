import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


const ModalComponent = ({
    btn, btnColor, title, children, hideCancelBtn, className, modalSize, scrollable, onClickHandler
}) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal((prevState) => !prevState);
    };

    const onBtnClick = () => {
        onClickHandler(toggle);
    }

    return (
        <div>
            <Button color={btnColor} onClick={onBtnClick}>
                {btn}
            </Button>
            <Modal isOpen={modal} toggle={toggle} size={modalSize} className={className} scrollable={scrollable}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    {!hideCancelBtn && (
                        <Button onClick={toggle} color="secondary">
                            Cancel
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
}

ModalComponent.defaultProps = {
    btn: 'Show',
    btnColor: 'info',
    title: '',
    children: '',
    hideCancelBtn: false,
    className: '',
    modalSize: '',
    scrollable: false,
    onClickHandler: callback => callback(),
}

export default ModalComponent;