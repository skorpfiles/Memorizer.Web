import { createSlice } from '@reduxjs/toolkit';

const wallpaperViewSlice = createSlice({
    name: 'wallpaperViewSlice',
    initialState: {
        isWallpaperView: true
    },
    reducers: {
        enableWallpaperView(state) {
            state.isWallpaperView = true;
        },
        disableWallpaperView(state) {
            state.isWallpaperView = false;
        }
    }
});

export const wallpaperViewReducer = wallpaperViewSlice.reducer;
export const wallpaperViewActions = wallpaperViewSlice.actions;