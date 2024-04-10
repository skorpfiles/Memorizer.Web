import { createSlice } from '@reduxjs/toolkit';

const wallpaperViewSlice = createSlice({
    name: 'wallpaperViewSlice',
    initialState: {
        isWallpaperView: true,
        currentWallpaperView: 'mainWallpaper'
    },
    reducers: {
        enableWallpaperView(state) {
            state.isWallpaperView = true;
        },
        disableWallpaperView(state) {
            state.isWallpaperView = false;
        },
        setWallpaperView(state, newView) {
            state.currentWallpaperView = newView; 
        }
    }
});

export const wallpaperViewReducer = wallpaperViewSlice.reducer;
export const wallpaperViewActions = wallpaperViewSlice.actions;