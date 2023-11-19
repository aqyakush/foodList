import React from 'react';
import Spinner from 'react-spinner-material';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
           <Spinner />
        </div>
    );
};

export default LoadingSpinner;
