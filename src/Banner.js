import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from './utils/axios'
import requests from './utils/requests'

const Banner = () => {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)

            var ran = Math.floor(Math.random() * request.data.results.length - 1)
            console.log("In banner", request.data.results[ran])
            setMovie(request.data.results[ran])
            // Math.floor(Math.random() * request.data.results.length-1)
        }
        fetchData()
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title ">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button">Play</button>
                        <button className="banner__button">My List</button>

                    </div>
                    <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>
    )
}

export default Banner
