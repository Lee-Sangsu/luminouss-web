import React from 'react';

export const Registrations = ({data, divStyle, getH5Style}) => {
    return (<div style={divStyle}>
        <h5 style={{...getH5Style('90px'), textAlign:'center'}}>{data.date}</h5>
        <h5 style={getH5Style('310px')}>{data.name}</h5>
        <h5 style={getH5Style('115px')}>{data.place}</h5>
        <h5 style={getH5Style('226px')}>{data.roadName}</h5>
        <h5 style={getH5Style()}>{data.phoneNum}</h5>
    </div>);
};