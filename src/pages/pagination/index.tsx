import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';
import dayjs from 'dayjs';

import { API } from '../../constants';

import './index.css';
import useDebounce from '../../hooks/useDebounce';

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

export async function loader({params, request}: LoaderFunctionArgs) {
  const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const { page } = params;
  const requestUrl = new URL(request.url);
  const search = requestUrl.searchParams.get('search') ?? '';
  console.log('search', search)
  const pageValue = page ?? '1'

  let url

  if (search) {
    url = `${API.BASE_URL}/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
  } else {
    url = `${API.BASE_URL}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageValue}&sort_by=popularity.desc`;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };
  const response = await fetch(url, options);
  const movies = await response.json();

  return { movies, currentPage: parseInt(pageValue) };
}

export default function Pagination() {
  const { movies, currentPage } = useLoaderData() as { movies: Movies, currentPage: number };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');
  console.log('movies', movies)

  const [search, setSearch] = useState('')

  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'

  const onPreviousPagePressed = (currentPage: number) => (): void => {
    if ((currentPage - 1) >= 1) {
      const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
      navigate(`/pagination/${currentPage - 1}${query}`);
    }
  }

  const onNextPagePressed = (currentPage: number) => (): void => {
    const lastPage = movies.total_pages > 500 ? 500 : movies.total_pages
    if ((currentPage + 1) <= lastPage) {
      const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
      navigate(`/pagination/${currentPage + 1}${query}`);
    }
  }

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    navigate(`/pagination/1?search=${debounceSearch}`)
  }, [debounceSearch])

  return (
    <main className='container'>
      <div className='input-pagination-catainer'>
        <input 
          type="text" 
          className='input-search' 
          placeholder='search movie here...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='pagination-container'>
          <button className='button-arrow pagination-previous' onClick={onPreviousPagePressed(currentPage)}>
            ❮
          </button>
          <div className='pagination-number'>
            <p>{currentPage == 1 ? '' : `${currentPage - 1}`}</p>
            <p className='pagination-active-page'>{currentPage}</p>
            <p>{currentPage == 500 || movies.total_pages ? '' : `${currentPage + 1}`}</p>
            <p>.....</p>
            <p>{movies.total_pages > 500 ? '500' : movies.total_pages}</p>
          </div>
          <button className='button-arrow pagination-next' onClick={onNextPagePressed(currentPage)}>
            ❯
          </button>
        </div>
      </div>
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