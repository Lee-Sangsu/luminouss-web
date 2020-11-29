import {useEffect, useRef} from 'react';

const useH3FadeIn = () => {
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            const {current} = element;
            current.style.transition = `opacity 3.5s`;
            current.style.opacity = 1;
        }
    }, []);
    return {ref: element, style:{opacity:0, marginTop:'0',
    fontSize:'20px',
    whiteSpace: 'pre',
    fontWeight:'500'} };
};

export default useH3FadeIn;