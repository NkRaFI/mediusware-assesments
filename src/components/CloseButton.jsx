import React from 'react';

const CloseButton = ({...rest}) => {
    return (
        <button
            className="btn"
            type="button"
            style={{ backgroundColor: "white", border: "2px solid #46139f" }}
            {...rest}
        >
            CLOSE
        </button>
    );
};

export default CloseButton;