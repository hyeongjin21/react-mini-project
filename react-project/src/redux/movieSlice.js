import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    // name : 슬라이스 이름 정의
    name: 'movies',

    // initialState : 초기 상태 (초기값)
    initialState: {
        popularMovies: [],
        topRatedMovies: [],
        upComingKMovies: []
    },

    // reducers : 액션을 처리하는 함수
    reducers: {
        getPopularMovies: (state,action) => {
            state.popularMovies = action.payload;
         },
        getTopRatedMoives: (state,action) => {
            state.topRatedMovies = action.payload;
         },
        getUPComingMovies: (state,action) => {
            state.upComingKMovies = action.payload;
         }
    }
})

export const { getPopularMovies, getTopRatedMoives, getUPComingMovies } = movieSlice.actions;

export default movieSlice.reducer;