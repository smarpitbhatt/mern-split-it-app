import React from 'react';

export default function Spinner(props) {
    return (
        <div className="d-block w-100 text-center">
            <div className="spinner-border text-primary" style={{height: "10rem", width: "10rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}