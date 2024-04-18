import ReturnToPage from '../ReturnToPage';
import TrainingPage from '../Pages/Training/TrainingPage';
import TrainingResultPage from '../Pages/Training/TrainingResultPage';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useEffect } from 'react';
function TrainingRouteElement() {
    const setWallpaperView = useWallpaperViewDispatcher();

    useEffect(() => {
        setWallpaperView('trainingWallpaper');
    }, [setWallpaperView]);

    return (
        <div className='route-element-with-return-button'>
            {/*<ReturnToPage path='/' text='Return to the main page' />*/}
            {/*<TrainingPage />*/}
            <TrainingResultPage/>
        </div>
    );
}

export default TrainingRouteElement;