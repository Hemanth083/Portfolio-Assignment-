import { useEffect, useState } from 'react';

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};

export default useScrollPosition;
