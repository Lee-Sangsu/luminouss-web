import React from 'react';
import GlobalNav from './GlobalNav';

const NoMatchedRouteComponent = () => {
    return (
        <>
            <GlobalNav isNotHome={true} />
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: window.innerWidth,
                height: window.innerHeight,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1 style={{
                    fontSize: '100px'
                }}>404</h1>
                <pre style={{textAlign:'center'}}>
{`해당 페이지를 찾을 수 없습니다.
Sorry, page not found.`}
                </pre>
            </div>
        </>
    )
};

export default NoMatchedRouteComponent;