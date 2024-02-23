import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomModal from './CustomModal';
import { useGetUsContactsMutation } from '../features/contact/contactSlice';
import DotLoader from './DotLoader';
import AllButton from './AllButton';
import UsButton from './UsButton';
import CloseButton from './CloseButton';
import Contact from './Contact';

const UsContact = () => {
    /**-Ract Router-**/
    const { state, pathname } = useLocation()

    /**-React Hooks-**/
    const [showContactModal, setShowContactModal] = useState(false)
    const [data, setData] = useState([])
    const [country] = useState("United States")
    const [resultPerPage] = useState(20)
    const [pageCount, setPageCount] = useState(1)

    /**-RTK-**/
    //queries
    const [getUsContacts, { data: contacts, isLoading: contactsLoading }] = useGetUsContactsMutation()

    /**-Event Handler-**/
    const handleNextPage = async () => {
        setPageCount(prev => prev + 1)
    }

    /**-useEffects-**/
    useEffect(() => {
        setShowContactModal(state?.showModal)
    }, [state])

    useEffect(() => {
        getUsContacts({ country: country, page: 1, dataPerPage: resultPerPage })
            .then(({ data }) => setData(data?.results))
            .catch(err => console.log(err))
    }, [pathname])

    useEffect(() => {
        const totalPage = Math.ceil(contacts?.count / resultPerPage)
        if (pageCount > 1 && pageCount <= totalPage) {
            getUsContacts({ country: country, page: pageCount, dataPerPage: resultPerPage })
                .then(({ data }) => setData(prev => [...prev, ...data?.results]))
                .catch(err => console.log(err))
        }
    }, [pageCount])

    return (
        <CustomModal
            showModal={showContactModal}
            setShowModal={setShowContactModal}
            heading="US Contacts"
        >
            <div
                className='position-relative overflow-auto'
                style={{ maxHeight: "70vh" }}
            >
                <section>
                    <section className='d-grid gap-3 pb-3'>
                        {
                            data?.map(contact => (
                                <Contact key={contact.id} contact={contact} />
                            ))
                        }
                        {
                            contactsLoading && <DotLoader />
                        }
                        {
                            !(pageCount === Math.ceil(contacts?.count / resultPerPage)) &&
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleNextPage}
                                    disabled={contactsLoading}
                                >
                                    Load More
                                </button>
                            </div>
                        }
                    </section>
                </section>
                <section className="d-flex justify-content-end gap-3 position-sticky bottom-0 start-0 w-full bg-white py-2">
                    <Link
                        className="nav-link"
                        to="/problem-2/contact/all"
                        state={{ showModal: true }}
                    >
                        <AllButton />
                    </Link>
                    <Link
                        className="nav-link"
                        to="/problem-2/contact/us"
                        state={{ showModal: true }}
                    >
                        <UsButton />
                    </Link>
                    <CloseButton
                        onClick={() => {
                            setShowContactModal(false)
                        }}
                    />
                </section>
            </div>
        </CustomModal>
    );
};

export default UsContact;