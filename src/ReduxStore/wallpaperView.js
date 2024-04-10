import { createSlice } from '@reduxjs/toolkit';

const wallpaperViewSlice = createSlice({
    name: 'wallpaperViewSlice',
    initialState: {
        isWallpaperView: 'none',
        currentWallpaperView: 'mainWallpaper'
    },
    reducers: {
        setWallpaperView(state, newView) {
            state.currentWallpaperView = newView.payload;
        }
    }
});

export const wallpaperViewReducer = wallpaperViewSlice.reducer;
export const wallpaperViewActions = wallpaperViewSlice.actions;