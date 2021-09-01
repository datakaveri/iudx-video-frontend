import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = (props) => {
    return (
        <Modal
            isOpen={props.isShowing}
            toggle={() => { props.setIsShowing() }}
            size={props.size}
            scrollable={props.scrollable}
        >
            {props.children}
        </Modal>
    );
}

const CustomModalBody = (props) => {
    return (
        <ModalBody>
            {props.children}
        </ModalBody>
    );
}

const CustomModalHeader = (props) => {
    return (
        <ModalHeader>
            {props.children}
        </ModalHeader>
    );
}

const CustomModalFooter = (props) => {
    return (
        <ModalFooter>
            {props.children}
        </ModalFooter>
    );
}

export {
    CustomModal,
    CustomModalBody,
    CustomModalHeader,
    CustomModalFooter,
};