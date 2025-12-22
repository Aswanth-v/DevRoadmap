import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: (() => {
    const stored = localStorage.getItem("likedVideos");
    return stored ? JSON.parse(stored) : [];
  })(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.videos.find(v => v._id === action.payload._id);
      if (!exists) state.videos.push(action.payload);
      localStorage.setItem("likedVideos", JSON.stringify(state.videos));
    },
    removeFromFavorites: (state, action) => {
      state.videos = state.videos.filter(v => v._id !== action.payload);
      localStorage.setItem("likedVideos", JSON.stringify(state.videos));
    },
  },
});


export const { addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
