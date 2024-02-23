import React, { useState } from 'react';
import CustomModal from './CustomModal';

const Contact = ({ contact }) => {
    const [showDetailsModal, setShowDetailsModal] = useState()

    return (
        <>
            <p
                key={contact.id}
                className='m-0 bg-info bg-opacity-25 py-2 px-1 rounded'
                style={{ cursor: "pointer" }}
                onClick={() => setShowDetailsModal(true)}
            >
                <span>☎️</span> {contact?.phone}
            </p>
            <CustomModal
                showModal={showDetailsModal}
                setShowModal={setShowDetailsModal}
                heading='CONTACT DETAILS'
                size='sm'
                className='bg-warning bg-opacity-25'
            >
                <div>
                    <p className='m-0 small fw-semibold'><span>Phone:</span> <span>{contact?.phone}</span></p>
                    <p className='m-0 small fw-semibold'><span>Country:</span> <span>{contact?.country?.name}</span></p>
                </div>
            </CustomModal>
        </>
    );
};

export default Contact;