import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from './MovieCard';

const MovieSlide = ({movie, type}) => {

  // console.log('MovieSlide', movie.results)
  //post_path + https://www.themoviedb.org/t/p/w355_and_h200_multi_faces

  // const [movies, setMovies] = useState()

  // useEffect(() => {
  //   if (props.movie == undefined) return;
  //   setMovies(props.movie.map(function (data) {
  //     let moviepath = `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${data.poster_path}`
  //     console.log('map', data)
  //     return (
  //       <div>
  //         <img src={`${moviepath}`}></img>
  //       </div>
  //     )
  //   }))
  // }, [props.movie])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (

    <Carousel responsive={responsive}>
      {movie.results.map(item => (
        <MovieCard movie={item} type={type} key={item.id}></MovieCard>
      ))}
    </Carousel>
  )
}

export default MovieSlide