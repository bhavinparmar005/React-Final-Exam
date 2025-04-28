import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-danger bg-gradient position-relative overflow-hidden">
            <div>
                {/* Floating bubbles */}
                <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none">
                    <div className="position-absolute rounded-circle bg-danger" style={{ width: '12px', height: '12px', top: '2.5rem', left: '2.5rem' }} />
                    <div className="position-absolute rounded-circle bg-danger bg-opacity-75 float-bubble" style={{ width: '16px', height: '16px', top: '5rem', left: '66%' }} />
                    <div className="position-absolute rounded-circle bg-danger bg-opacity-50 float-bubble" style={{ width: '8px', height: '8px', bottom: '2.5rem', right: '2.5rem' }} />
                    <div className="position-absolute rounded-circle bg-danger bg-opacity-100 float-bubble" style={{ width: '12px', height: '12px', bottom: '5rem', left: '33%' }} />
                </div>

                {/* Card */}
                <div className="card bg-light bg-opacity-50 backdrop-blur p-4 text-center shadow-lg rounded-4 animate-pop">
                    <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-danger text-white shadow" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                        ⨉
                    </div>
                    <h1 className="text-danger fw-bold mb-2">ERROR</h1>
                    <p className="text-danger mb-4">Your action was wrong. 404 Page Not Found.</p>
                    <a href="/" className="btn btn-danger btn-lg rounded-pill">Go Back</a>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
