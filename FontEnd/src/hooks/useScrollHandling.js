import { useEffect, useRef, useState } from "react";


const useScrollHandling = () => {
    const [scrollDriction, setScrollDriction] = useState(null); //gan gia tri la 'down' hay 'up
    const prevScrollPosition = useRef(0); //tao gia tri de biet la len hay xuong
    const [scrollPositon, setScrollPosition] = useState(0);//de biet gia tri tu bao nhieu de bat dau truot anh 

    const scrollTracking = () => {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > prevScrollPosition.current) {
            setScrollDriction('down');
        } else if (currentScrollPosition < prevScrollPosition.current) {
            setScrollDriction('up');
        }
        prevScrollPosition.current = currentScrollPosition <= 0 ? 0 : currentScrollPosition; //gan gia tri prevScrollPosition.current nya lai de so sanh de biet la len hay xuong

        setScrollPosition(currentScrollPosition); //de biet gia tri la bao nhieu thi bat dau truot anh
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollTracking);
        return () => window.removeEventListener('scroll', scrollTracking);
    }, [])

    return {
        scrollDriction,
        scrollPositon
    }
}

export default useScrollHandling