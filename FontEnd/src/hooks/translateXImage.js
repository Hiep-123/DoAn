import useScrollHandling from '@/hooks/useScrollHandling'
import { useEffect, useState } from 'react';

const useTranslateXImage = () => {
    const { scrollDriction, scrollPositon } = useScrollHandling();
    const [translateXPosition, setTranslateXPosition] = useState(120); //khoi tao gia tri ban dau de di chuyen anh bang px


    const handleTranslateX = () => {
        if (scrollDriction === 'down' && scrollPositon >= 3200) {
            setTranslateXPosition(
                translateXPosition <= 0 ? 0 : translateXPosition - 1
            )
        } else if (scrollDriction === 'up') {
            setTranslateXPosition(
                translateXPosition >= 150 ? 150 : translateXPosition + 1
            )
        }
    }


    useEffect(() => {
        handleTranslateX();
    }, [scrollPositon])

    return {
        translateXPosition
    }
}

export default useTranslateXImage;