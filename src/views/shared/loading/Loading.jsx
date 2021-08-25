import React from 'react';
import './Loading.scss';

const Loading = ({ isActive, children }) => {
    return (
        <div>
            {isActive && (
                <div className="spinner">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default Loading;
