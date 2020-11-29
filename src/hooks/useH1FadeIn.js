import {useEffect, useRef} from 'react';

const useH1FadeIn = () => {
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            const {current} = element;
            current.style.transition = `opacity 2.6s`;
            current.style.opacity = 1;
        }
    }, []);
    return {ref: element, style:{opacity:0, marginTop:'0',fontSize:'55px', whiteSpace: 'pre'} };
};

export default useH1FadeIn;