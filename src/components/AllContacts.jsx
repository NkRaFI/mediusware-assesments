import React, { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import { Link, useLocation } from 'react-router-dom';
import { useGetAllContactsMutation } from '../features/contact/contactSlice';
import DotLoader from './DotLoader';
import UsButton from './UsButton';
import AllButton from './AllButton';
import CloseButton from './CloseButton';
import Contact from './Contact';

const AllContacts = () => {
    /**-Ract Router-**/
    const { state, pathname } = useLocation()

    /**-React Hooks-**/
    const [showContactModal, setShowContactModal] = useState(false)
    const [data, setData] = useState([])
    const [resultPerPage] = useState(20)
    const [pageCount, setPageCount] = useState(1)

    /**-RTK-**/
    //queries
    const [useGetAllContact, { data: contacts, isLoading: contactsLoading }] = useGetAllContactsMutation()

    /**-Event Handler-**/
    const handleNextPage = async () => {
        setPageCount(prev => prev + 1)
    }

    /**-useEffects-**/
    useEffect(() => {
        setShowContactModal(state?.showModal)
    }, [state])

    useEffect(() => {
        useGetAllContact({ page: 1, dataPerPage: resultPerPage })
            .then(({ data }) => setData(data?.results))
            .catch(err => console.log(err))
    }, [pathname])

    useEffect(() => {
        const totalPage = Math.ceil(contacts?.count / resultPerPage)
        if (pageCount > 1 && pageCount <= totalPage) {
            useGetAllContact({ page: pageCount, dataPerPage: resultPerPage })
                .then(({ data }) => setData(prev => [...prev, ...data?.results]))
                .catch(err => console.log(err))
        }
    }, [pageCount])

    return (
        <CustomModal
            showModal={showContactModal}
            setShowModal={setShowContactModal}
            heading="All Contacts"
        >
            <div
                className='position-relative overflow-auto'
                style={{ maxHeight: "70vh" }}
            >
                <section className='d-grid gap-3 pb-3 px-1'>
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

export default AllContacts;