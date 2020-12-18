import React from 'react';

import SetEntireStates from 'functions/SetEntireStates';

const Informations = () => {

    const a = SetEntireStates();

    return (
    <div style={{
        display:"flex",
        width: '30%',
        height: '100%',
        backgroundColor: "black"
    }}>
        <h4 style={{color: 'white'}}>address: {a.address_name}</h4>

    </div>
    );
};

export default Informations;
