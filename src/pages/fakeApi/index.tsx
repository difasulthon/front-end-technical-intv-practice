import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import './index.css';

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Movies = {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}

const mockMovies = {
   "page":1,
   "results":[
      {
         "adult":false,
         "backdrop_path":"/ebyxeBh56QNXxSJgTnmz7fXAlwk.jpg",
         "genre_ids":[
            28,
            878,
            12
         ],
         "id":1242898,
         "original_language":"en",
         "original_title":"Predator: Badlands",
         "overview":"Cast out from his clan, a young Predator finds an unlikely ally in a damaged android and embarks on a treacherous journey in search of the ultimate adversary.",
         "popularity":788.0559,
         "poster_path":"/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg",
         "release_date":"2025-11-05",
         "title":"Predator: Badlands",
         "video":false,
         "vote_average":7.709,
         "vote_count":1207
      },
      {
         "adult":false,
         "backdrop_path":"/vMxOmgmBGegjVObjlb8ugsjGgkD.jpg",
         "genre_ids":[
            10752,
            28,
            18
         ],
         "id":1252037,
         "original_language":"de",
         "original_title":"Der Tiger",
         "overview":"A German Tiger tank crew is sent on a dangerous mission to rescue the missing officer Paul von Hardenburg from a top-secret bunker behind enemy lines. As they make their way through the lethal no-man's land, they must confront not only the enemy, but also their own fears and inner demons. Fueled by the Wehrmacht's methamphetamine, their mission increasingly becomes a journey into the heart of darkness.",
         "popularity":394.5915,
         "poster_path":"/65Jr1JAgWlu9em8zHhAfrNJJQBt.jpg",
         "release_date":"2025-09-18",
         "title":"The Tank",
         "video":false,
         "vote_average":7.115,
         "vote_count":165
      },
      {
         "adult":false,
         "backdrop_path":"/vm4H1DivjQoNIm0Vs6i3CTzFxQ0.jpg",
         "genre_ids":[
            878,
            12,
            14
         ],
         "id":83533,
         "original_language":"en",
         "original_title":"Avatar: Fire and Ash",
         "overview":"In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
         "popularity":364.9943,
         "poster_path":"/cf7hE1ifY4UNbS25tGnaTyyDrI2.jpg",
         "release_date":"2025-12-17",
         "title":"Avatar: Fire and Ash",
         "video":false,
         "vote_average":7.4,
         "vote_count":1322
      },
   ],
   "total_pages":54613,
   "total_results":1092256
}

export default function FakeApi() {
  const [movies, setMovies] = useState<Movies>()

  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'

  const getDataFromFakeApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies)
      }, 1000)
    })
  };

  const callApi = async () => {
    try {
      const response = await getDataFromFakeApiCall()

      setMovies(response)
    } catch(e) {

    }
  }

  useEffect(() => {
    callApi()
  }, [])

  console.log('movies', movies)

  return (
    <main>
      <div className='movies'>
        {movies && movies.results.map((movie: Movie) => (
          <div className='movie-container' key={movie.id}>
            <img src={`${posterBaseUrl}${movie.poster_path}`} alt="" className='movie-poster' />
            <h4 className='movie-title'>{movie.title}</h4>
            <div className='movie-date-vote-container'>
              <p className='movie-date'>{dayjs(movie.release_date).format('MMM, YYYY')}</p>
              <p className='movie-vote'>{movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}