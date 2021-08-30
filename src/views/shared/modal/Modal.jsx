import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.isShowing}
                toggle={() => { props.setIsShowing(!props.isShowing) }}
                size={props.size}
                className={props.className}
                scrollable={props.scrollable}
            >
                {props.children}
            </Modal>
        </div>
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