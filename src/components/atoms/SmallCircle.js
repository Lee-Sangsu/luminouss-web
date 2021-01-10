import React from 'react';

const SmallCircle = ({size, color, id, className}) => {
    return (
        <div style={{
            width: `${size}`,
            height: `${size}`,
            marginRight:'7px',
            overflow: 'hidden'
        }}>
            <div id={id} className={className} style={{
                backgroundColor: color,
                width: `${size}`,
                height: `${size}`,
                // border: `1px solid ${color}`,
                borderRadius: '50%',
                boxSizing: 'border-box',
                transition: '0.7s ease-in'
            }} />
        </div>
    );
};

export default SmallCircle;