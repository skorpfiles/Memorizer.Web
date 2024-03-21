import ReturnToPage from '../ReturnToPage';
import TrainingPage from '../Pages/Training/TrainingPage';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useEffect } from 'react';
function TrainingRouteElement() {
    const [, disableWallpaperView] = useWallpaperViewDispatcher();

    useEffect(() => {
        disableWallpaperView();
    }, [disableWallpaperView]);

    return (
        <div className='route-element-with-return-button'>
            <ReturnToPage path='/' text='Return to the main page' />
            <TrainingPage />
        </div>
    );
}

export default TrainingRouteElement;