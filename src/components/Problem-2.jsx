import React, { useEffect, useState } from 'react';
import CustomModal from './CustomModal';

const Problem2 = () => {
    const [showAllContactModal, setShowAllContactModal] = useState(false)
    const [showUSContactModal, setShowUSContactModal] = useState(false)
    const [allContacts, setAllContacts] = useState({})
    const [allUSContacts, setAllUSContacts] = useState({})

    const api = "https://contact.mediusware.com/api"

    useEffect(() => {
        if (showAllContactModal) {
            fetch(`${api}/contacts`)
                .then(result => result.json())
                .then(data => setAllContacts(data))
                .catch(err => console.log(err))
        }
        if (showUSContactModal) {
            fetch(`${api}/country-contacts/United States`)
                .then(result => result.json())
                .then(data => setAllUSContacts(data))
                .catch(err => console.log(err))
        }
    }, [showAllContactModal, showUSContactModal])

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg text-white"
                        style={{ backgroundColor: "#46139f" }}
                        type="button"
                        onClick={() => setShowAllContactModal(true)}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg"
                        type="button"
                        style={{ backgroundColor: "#ff7f50" }}
                        onClick={() => setShowUSContactModal(true)}
                    >
                        US Contacts
                    </button>
                </div>

                <CustomModal
                    showModal={showAllContactModal}
                    setShowModal={setShowAllContactModal}
                    heading="All Contacts"
                >
                    <div
                        className='position-relative overflow-auto'
                        style={{ maxHeight: "70vh" }}
                    >
                        <section>
                            {
                                allContacts?.results?.map(contact => (
                                    <p key={contact.id} className='m-0'>{contact?.phone}</p>
                                ))
                            }
                        </section>
                        <section className="d-flex justify-content-end gap-3 position-sticky bottom-0 start-0 w-full bg-white">
                            <button
                                className="btn text-white"
                                style={{ backgroundColor: "#46139f" }}
                                type="button"
                                onClick={() => {
                                    setShowUSContactModal(false)
                                    setShowAllContactModal(true)
                                }}
                            >
                                ALL CONTACTS
                            </button>
                            <button
                                className="btn"
                                type="button"
                                style={{ backgroundColor: "#ff7f50" }}
                                onClick={() => {
                                    setShowAllContactModal(false)
                                    setShowUSContactModal(true)
                                }}
                            >
                                US CONTACTS
                            </button>
                            <button
                                className="btn"
                                type="button"
                                style={{ backgroundColor: "white", border: "2px solid #46139f" }}
                                onClick={() => {
                                    setShowAllContactModal(false)
                                    setShowUSContactModal(false)
                                }}
                            >
                                CLOSE
                            </button>
                        </section>
                    </div>
                </CustomModal>
                <CustomModal
                    showModal={showUSContactModal}
                    setShowModal={setShowUSContactModal}
                    heading="US Contacts"
                >
                    <div
                        className='position-relative overflow-auto'
                        style={{ maxHeight: "70vh" }}
                    >
                        <section>
                            {
                                allUSContacts?.results?.map(contact => (
                                    <p key={contact.id} className='m-0'>{contact?.phone}</p>
                                ))
                            }
                        </section>
                        <section className="d-flex justify-content-end gap-3 position-sticky bottom-0 start-0 w-full bg-white">
                            <button
                                className="btn text-white"
                                style={{ backgroundColor: "#46139f" }}
                                type="button"
                                onClick={() => {
                                    setShowUSContactModal(false)
                                    setShowAllContactModal(true)
                                }}
                            >
                                ALL CONTACTS
                            </button>
                            <button
                                className="btn"
                                type="button"
                                style={{ backgroundColor: "#ff7f50" }}
                                onClick={() => {
                                    setShowAllContactModal(false)
                                    setShowUSContactModal(true)
                                }}
                            >
                                US CONTACTS
                            </button>
                            <button
                                className="btn"
                                type="button"
                                style={{ backgroundColor: "white", border: "2px solid #46139f" }}
                                onClick={() => {
                                    setShowAllContactModal(false)
                                    setShowUSContactModal(false)
                                }}
                            >
                                CLOSE
                            </button>
                        </section>
                    </div>
                </CustomModal>
            </div>
        </div>
    );
};

export default Problem2;