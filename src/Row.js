import React, { useState, useEffect } from 'react'
import axios from './utils/axios'
import './Row.css'

import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const Row = ({ title, fetchURL, isLargeRow }) => {

    const baseURL = "https://image.tmdb.org/t/p/original/"
    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            // console.log(request.data.results)
            setMovies(request.data.results)
        }
        fetchData()
    }, [fetchURL])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL('')
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                })
                .catch((err) => console.log(err))
        }
    }
    // console.log(movies)

    return (
        <div className="row">
            <h1>{title}</h1>

            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        // onClick={handleClick(movie)}
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                ))}
            </div>
            {/* {trailerURL && <YouTube videoId={trailerURL} opts={opts} />} */}
        </div>
    )
}

export default Row
