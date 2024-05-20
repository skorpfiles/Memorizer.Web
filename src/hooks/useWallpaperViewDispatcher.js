import { useDispatch } from 'react-redux';
import { wallpaperViewActions } from '../ReduxStore/wallpaperView';

export const useWallpaperViewDispatcher = () => {
    const dispatch = useDispatch();
    return (newView) => {
        switch (newView) {
            case 'mainWallpaper':
                document.body.style.backgroundImage = "url('bookbrighted.webp')";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundAttachment = "fixed";
                break;
            case 'none':
                document.body.style.backgroundImage = null;
                document.body.style.backgroundSize = null;
                document.body.style.backgroundRepeat = null;
                break;
            case 'trainingWallpaper':
                document.body.style.backgroundImage = "linear-gradient(to bottom, #ABC0E4, white 76%)";
                document.body.style.backgroundSize = null;
                document.body.style.backgroundRepeat = null;
                document.body.style.backgroundAttachment = "fixed";
                break;
            default: break;
        }
        dispatch(wallpaperViewActions.setWallpaperView(newView));
    };
};