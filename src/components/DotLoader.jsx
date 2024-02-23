import React from 'react';

const DotLoader = () => {
    return (
        <div className='d-flex justify-content-center gap-3 px-2 py-3'>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default DotLoader;