import React from 'react';
import { Modal } from 'react-bootstrap';


const CustomModal = ({ heading = "", showModal, setShowModal, size = "lg", className = "", children }) => {

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size={size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className={className}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className='border-0 fs-5 d-inline-block text-truncate'>
                            {heading}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className=''>
                        {children}
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default CustomModal;