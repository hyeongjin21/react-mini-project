import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap'
import ScaleLoader from 'react-spinners/ScaleLoader'
import axios from '../axios';

const MovieDetail = () => {

    // redux에 있는 데이터 가지고 옴
    const { popularMovies, topRatedMovies, upComingKMovies } = useSelector(state => state.movies)

    const [loading, setLoading] = useState(true);

    // useParams 
    // Route 작성하는 부분에 /:id <- path 작성
    const { id } = useParams();

    // useSearchParams
    // url 을 작성하는 부분에 ?type=어쩌구저쩌구
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    // console.log('data', id, type)

    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    // console.log('불러온데이터', popularMovies)
    // console.log('찾는데이터',)
    // popularMovies.results.find(function (item) { return item.id == id })

    // console.log(popularMovies)

    /** 내가 가져올 영화에 대한 데이터를 추출하는 함수 */
    const getMovieData = () => {
        switch (type) {
            case 'popularMovies':
                setMovie(popularMovies.results.find((item) => {
                    // console.log('type에서 가져옴', item)
                    return item.id == id
                }));
                break;
            case 'topRatedMovies':
                setMovie(topRatedMovies.results.find((item) => { return item.id == id }));
                break;
            case 'upComingKMovies':
                setMovie(upComingKMovies.results.find((item) => { return item.id == id }));
                break;
        }
    }

    useEffect(() => {
        // console.log('현재 moive',movie)
        if (movie) {
            // movie 라는 state에 새로운 값이 들어가면, 그 값을 sessionStorage 안에 저장
            sessionStorage.setItem('movie', JSON.stringify(movie));
            getReviewData();
        }
    }, [movie])

    /** 내가 선택한 영화에 대한 리뷰를 가져오는 함수 */
    const getReviewData = () => {
        // {movie_id}/reviews
        axios
            .get(`/${id}/reviews`)
            .then(res => {
                // console.log('axios then', res.data.results)
                setReviews(res.data.results.map(data=>{
                    // console.log('map data',data)
                    return(
                        <div key={data.id}>
                            <hr/>
                            <p>{data.content}</p>
                            <p>
                                작성자 {data.author_details.username} |
                                작성일 {data.created_at}
                            </p>
                        </div>
                    )
                }))
            })
    }

    useEffect(() => {
        const sessionMovie = JSON.parse(sessionStorage.getItem('movie'))
        // console.log('sessionMoive',sessionMovie)
        // 세션 안에 값이 존재한다면 (이미 클릭한 전적) -> 세션안에 있는 값을 movie 세팅
        if (sessionMovie) {
            setMovie(sessionMovie);
        }
        else {
            getMovieData();
        }
        // 세션 안에 값이 없다면 (최초클릭) -> Redux 로 가서 movie 세팅
        setLoading(false);

        // console.log('idididid',movie.id)
    }, [popularMovies.results, topRatedMovies.results, upComingKMovies.results, id, type])

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



    const movieImg = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`

    // console.log('type', movie)

    return (
        <div className='movie-detail'>
            <div className='movie-box'>
                <div className='detail-poster' style={{ backgroundImage: `url(${movieImg})` }}></div>
                <br />
                <div className='detail-item'>
                    <h1>{movie.title}</h1>
                    {movie.adult ? <Badge bg="danger">청소년 관람 불가</Badge> : <Badge bg="success">전체 관람 가능</Badge>}
                    <div>
                        <span>평점 : {movie.vote_average}점</span>{' '}
                        <span>개봉일 : {movie.release_date}</span>
                    </div>
                    <div>소개글</div>
                    <div>{movie.overview}</div>
                    <hr />
                    <h2>Review</h2>
                    { reviews.length === 0
                    ? <p>등록된 리뷰가 없습니다.</p>
                    : (reviews)
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDetail