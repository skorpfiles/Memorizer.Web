import { useDispatch } from 'react-redux';
import { wallpaperViewActions } from '../ReduxStore/wallpaperView';

export const useWallpaperViewDispatcher = () => {
    const dispatch = useDispatch();
    return (newView) => {
        switch (newView) {
            case 'mainWallpaper':
                document.body.style.backgroundImage = "url('book brighted.jpg')";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
                dispatch(wallpaperViewActions.enableWallpaperView());
                break;
            case 'none':
                document.body.style.backgroundImage = null;
                document.body.style.backgroundSize = null;
                document.body.style.backgroundRepeat = null;
                dispatch(wallpaperViewActions.disableWallpaperView());
                break;
            case 'trainingWallpaper':
                document.body.style.backgroundImage = "linear-gradient(to bottom, #ABC0E4, white 76%)";
                document.body.style.backgroundSize = null;
                document.body.style.backgroundRepeat = null;
                dispatch(wallpaperViewActions.enableWallpaperView());
                break;
            default: break;
        }
        dispatch(wallpaperViewActions.setWallpaperView(newView));
    };
};