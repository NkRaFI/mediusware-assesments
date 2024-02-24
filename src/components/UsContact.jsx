import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomModal from './CustomModal';
import { useGetUsContactsMutation } from '../features/contact/contactSlice';
import DotLoader from './DotLoader';
import AllButton from './AllButton';
import UsButton from './UsButton';
import CloseButton from './CloseButton';
import Contact from './Contact';
import { useForm } from 'react-hook-form';

const UsContact = () => {
    /**-Ract Router-**/
    const { state, pathname } = useLocation()

    /**-React Hooks-**/
    const [showContactModal, setShowContactModal] = useState(true)
    const [data, setData] = useState([])
    const [dataWithEvenID, setDataWithEvenID] = useState([])
    const [country] = useState("United States")
    const [resultPerPage] = useState(20)
    const [pageCount, setPageCount] = useState(1)
    const [onlyEvenChecked, setOnlyEvenChecked] = useState(false)
    const onlyEvenInputRef = useRef()

    /**-RTK-**/
    //queries
    const [getUsContacts, { data: contacts, isLoading: contactsLoading }] = useGetUsContactsMutation()

    /**-Hook Form-**/
    const { register, handleSubmit, watch } = useForm()
    const searchTerm = watch("query") || ""

    /**-Event Handler-**/
    const handleNextPage = async () => {
        setPageCount(prev => prev + 1)
        setOnlyEvenChecked(false)
        onlyEvenInputRef.current.checked = false
    }
    const handleSearchSubmit = async (formData) => {
        try {
            const { data: searchResult } = await getUsContacts({ search: formData.query, page: pageCount, dataPerPage: resultPerPage })
            setData(searchResult?.results)
        } catch (error) {
            console.log(error)
        }
    }
    // const hanldeOnlyEvenChange = (e) => {
    //     if (e.target.checked) {
    //         const filterdData = data.filter(item => item.id % 2 === 0)
    //         setData(filterdData)
    //     }
    // }

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
            getUsContacts({ search: searchTerm, country: country, page: pageCount, dataPerPage: resultPerPage })
                .then(({ data }) => setData(prev => [...prev, ...data?.results]))
                .catch(err => console.log(err))
        }
    }, [pageCount])

    useEffect(() => {
        let timer
        if (searchTerm.length) {
            timer = setTimeout(() => {
                getUsContacts({ search: searchTerm, page: pageCount, dataPerPage: resultPerPage })
                    .then(({ data }) => setData(data?.results))
                    .catch(err => console.log(err))
            }, 700)
        }

        return () => clearTimeout(timer)

    }, [searchTerm])

    useEffect(() => {
        if (onlyEvenChecked) {
            const filterdData = data.filter(item => item.id % 2 === 0)
            setDataWithEvenID(filterdData)
        } else {
            setDataWithEvenID([])
        }
    }, [onlyEvenChecked])

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
                    <section className='d-grid gap-3 pt-1 pb-3 px-1'>
                        <form
                            onSubmit={handleSubmit(handleSearchSubmit)}
                        >
                            <div className="w-50 mx-auto">
                                <input
                                    className='form-control'
                                    placeholder='Search here'
                                    {...register("query")}
                                />
                            </div>
                        </form>
                        {
                            contactsLoading && <DotLoader />
                        }
                        {
                            dataWithEvenID?.length
                                ?
                                dataWithEvenID?.map(contact => (
                                    <Contact key={contact.id} contact={contact} />
                                ))
                                :
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
                <section className="d-flex justify-content-between align-items-end position-sticky bottom-0 start-0 w-full bg-white py-2 px-1 border-top">
                    <div className='d-flex align-items-center gap-2'>
                        <input
                            type="checkbox"
                            style={{ height: "20px", width: "20px" }}
                            id="even_only"
                            onClick={(e) => setOnlyEvenChecked(e.target.checked)}
                            ref={onlyEvenInputRef}
                        />
                        <label htmlFor="even_only" className='fw-semibold'>Only even</label>
                    </div>
                    <div className="d-flex gap-2">
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
                    </div>
                </section>
            </div>
        </CustomModal>
    );
};

export default UsContact;