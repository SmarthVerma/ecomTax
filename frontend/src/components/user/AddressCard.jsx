import React from 'react';

const AddressCard = ({ details }) => {
    // Return a loading state if details is not available yet
    if (!details) {
        return <div>Loading...</div>;
    }

    // Destructure fields from details
    const { address, city, state, pinCode, county } = details;

    return (
        <div>
            <h3 className="leading-tight m-0 text-lg">Smart Address</h3>
            <div className="font-light text-sm">
                <p>{address || 'Address not available'}</p>
                <p>{pinCode || 'Pin code not available'}</p>
                <p>{city || 'City not available'}</p>
                <p>{state || 'State not available'}</p>
                <p>{county || 'County not available'}</p>
            </div>
        </div>
    );
}

export default AddressCard;