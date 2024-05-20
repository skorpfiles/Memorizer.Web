import SelectTrainingPage from '../Pages/ConfigureTraining/SelectTrainingPage';
import ReturnToPage from '../ReturnToPage';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useEffect } from 'react';

function SelectTrainingRouteElement() {

    const setWallpaperView = useWallpaperViewDispatcher();

    useEffect(() => {
        setWallpaperView('none');
    }, [setWallpaperView]);

    return (
        <div className='route-element-with-return-button'>
            <ReturnToPage path='/' text='Return to the main page' />
            <SelectTrainingPage/>
        </div>
    );
}

export default SelectTrainingRouteElement;