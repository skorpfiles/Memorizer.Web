import { useEffect } from 'react';

export const useEnterKey = (handlingAction) => {
    useEffect(() => {
        const handleEnterPressed = (event) => {
            if (event.key === 'Enter') {
                handlingAction();
            }
        }

        window.addEventListener('keydown', handleEnterPressed);

        return () => {
            window.removeEventListener('keydown', handleEnterPressed);
        };
    }, [handlingAction]);
}