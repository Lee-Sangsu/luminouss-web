import React from 'react';

const Circle = ({color, left, top, id, className}) => {
    return (
        <div style={{
            width: '280px',
            height: '280px',
            overflow: 'hidden'
        }}>
            <div id={id} className={className} style={{
                backgroundColor: color,
                width: '280px',
                height: '280px',
                // border: `1px solid ${color}`,
                borderRadius: '50%',
                boxSizing: 'border-box',
                position: 'fixed',
                left: left,
                top: top,
                zIndex: -2,
                transition: '0.7s ease-in'
            }} />
        </div>
    );
};

export default Circle;