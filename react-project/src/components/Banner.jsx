import React, { useState, useEffect } from 'react'

const Banner = (props) => {
  const [movie, setMovie] = useState()
  const [moviePath, setMoviePath] = useState()
  useEffect(() => {

    if (props.movie == undefined) return;

    let data = props.movie

    let movieImg = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.poster_path}`
    setMovie(() => {
      return (
        // style={{backgroundImage:'url(`${movieImg}`)'}}
        // { position: 'relative', width: '100%' }
        <div className='banner-img' style={{backgroundImage:`url(${movieImg})`}}>
          {/* <img src={`${movieImg}`} style={{ width: '100%', height: '600px'}}></img> */}
          {/*  style={{ width: '40%', zIndex: '1', position:'absolute', left:'50px', top: '50%'}} */}
          <div className='banner-item'>
            <h1>{data.title}</h1>
            {/* <br /> */}
            <p>{data.overview}</p>
          </div>
        </div>
      )
    })

  }, [props.movie])
  // console.log('props', props)
  //https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/
  /*
    배너 이미지의 디자인 => 너비 100%, 높이 600px 
    배너 아이템의 디자인 => width 40%,. 
  */

  return (
    <div>
      {movie}
    </div>
  )
}

export default Banner