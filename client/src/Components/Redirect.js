import React from 'react';

const Redirect = () => {

    return (
        <div>
        <span className='noShow' >{window.location.pathname += 'api/users/'}</span>
            Redirecting...
        </div>
    );
};

export default Redirect;