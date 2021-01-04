import React from 'react';

const SmallCircle = ({color, id, className}) => {
    return (
        <div style={{
            width: '35px',
            height: '35px',
            overflow: 'hidden'
        }}>
            <div id={id} className={className} style={{
                backgroundColor: color,
                width: '35px',
                height: '35px',
                // border: `1px solid ${color}`,
                borderRadius: '50%',
                boxSizing: 'border-box',
                transition: '0.7s ease-in'
            }} />
        </div>
    );
};

export default SmallCircle;