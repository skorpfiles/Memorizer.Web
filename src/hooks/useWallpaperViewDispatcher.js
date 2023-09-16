import { useDispatch } from 'react-redux';
import { wallpaperViewActions } from '../ReduxStore/wallpaperView';

export const useWallpaperViewDispatcher = () => {
    const dispatch = useDispatch();
    return [
        () => {
            document.body.style.backgroundImage = "url('book brighted.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            dispatch(wallpaperViewActions.enableWallpaperView());
        },
        () => {
            document.body.style.backgroundImage = null;
            document.body.style.backgroundSize = null;
            document.body.style.backgroundRepeat = null;
            dispatch(wallpaperViewActions.disableWallpaperView());
        }
    ];
};