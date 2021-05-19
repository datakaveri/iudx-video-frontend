import React from 'react';

const Loading = ({ isActive, children }) => {
    return (
        <div>
            {isActive && (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {children}
        </div>
    );
};

export default Loading;
