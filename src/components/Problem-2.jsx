import React from 'react';
import AllContacts from './AllContacts';
import { NavLink, Route, Routes } from 'react-router-dom';
import UsContact from './UsContact';
import AllButton from './AllButton';
import UsButton from './UsButton';

const Problem2 = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <NavLink
                        className="nav-link"
                        to="contact/all"
                        state={{ showModal: true }}
                    >
                        <AllButton />
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to="contact/us"
                        state={{ showModal: true }}
                    >
                        <UsButton />
                    </NavLink>
                </div>
                <Routes>
                    <Route path="contact/all" element={<AllContacts />} />
                    <Route path="contact/us" element={<UsContact />} />
                </Routes>
            </div>
        </div>
    );
};

export default Problem2;