import React, { useEffect, useState } from 'react';
import axios from '../axios';
import MovieSlide from '../components/MovieSlide';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularMovies, getTopRatedMoives, getUPComingMovies } from '../redux/movieSlice'
import Banner from '../components/Banner';
import ScaleLoader from 'react-spinners/ScaleLoader'

const Home = () => {

    // 기존에 있던 session Movie를 지워버릴거임!
    sessionStorage.removeItem('movie');

    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingKMovies } = useSelector(state => state.movies)
    const [loading, setLoading] = useState(true);

    /* 화면이 렌더링 되자마자, API를 가져올 것 */
    useEffect(() => {
        // include_adult=true& 성인용 추가
        const popularApi = axios.get('/popular?language=ko-KR&page=1'); 
        const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1');
        const upComingApi = axios.get('/upcoming?language=ko-KR&page=1');

        Promise
            .all([popularApi, topRatedApi, upComingApi])
            .then(res => {
                // console.log(res)
                // console.log('popularMovies',popularMovies.results)
                // API에서 받아온 데이터를 store 안에 넣고싶음 => useDispatch
                dispatch(getPopularMovies(res[0].data));
                dispatch(getTopRatedMoives(res[1].data));
                dispatch(getUPComingMovies(res[2].data));
            })
            .then(() => {
                setLoading(false)
            })
            ;

    }, [])

    // store에 값이 잘 들어갔는지 확인해보는 용도
    // useEffect(()=>{
    //     console.log('store의 상태',popularMovies,topRatedMovies,upComingKMovies)
    // },[popularMovies,topRatedMovies,upComingKMovies])

    if (loading) {
        return (
            <ScaleLoader
                color='#ffffff'
                loading={loading}
                height={115}
                width={15}
                radius={8}
                margin={8}
                ></ScaleLoader>
        )
    }

    return (
        <div>
            {/* 
                LifeCycle 생명주기 - 컴포넌트 
                - popularmovies 라는 애가 존재하면? => result
                - 존재하지 않는다면 배너 띄울필요x
            */}
            {/* 로딩스피너를 만들면 데이터가 안왔을 떄는 로딩만 리턴이 되기 때문에 별도로 조건부 처리를 해 줄 필요가 없다. */}
            <Banner movie={popularMovies.results[0]} />

            <h2>Popular Movies</h2>
            {/* 카드슬라이드 */}
            <MovieSlide movie={popularMovies} type='popularMovies'></MovieSlide>

            <h2>TopRated Movies</h2>
            {/* 카드슬라이드 */}
            <MovieSlide movie={topRatedMovies} type='topRatedMovies'></MovieSlide>

            <h2>UpComing Movies</h2>
            {/* 카드슬라이드 */}
            <MovieSlide movie={upComingKMovies} type='upComingKMovies'></MovieSlide>
        </div>
    )
}

export default Home