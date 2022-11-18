import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviePageTemplate from '../Templates/MoviePageTemplate'

let responseMovieData = []
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let dateString = year + '-' + month  + '-' + day;

function MoviePage() {
    const getCurrentGenreFromPath = path => {
        if (location.pathname.replaceAll('/movie', '') == '') return 0
        else return location.pathname.replaceAll('/movie/genre-', '')
    }

    const [movieData, setMovieData] = useState([])
    const [isFetching, setFetching] = useState(false)
    const [index, setIndex] = useState(0)
    const [hasNextPage, setNextPage] = useState(true)
    const [currentGenre, setCurrentGenre] = useState(getCurrentGenreFromPath(useLocation().pathname))
    const [currentSort, setCurrentSort] = useState('popularity.desc')
    
    const changeGenre = changedGenre => {
        if(changeGenre == currentGenre) return
        setIndex(0)
        setCurrentGenre(changedGenre)
    }
    
    const changeSort = changedSort => {
        if(changeSort == currentSort) return
        setIndex(0)
        setCurrentSort(changedSort)
    }

    async function getMovie({sort, genre}) {
        let api_key = '6199da9940f55ef72ddc1512ea6eca9a'
        let url = ''
        if(genre == 0) url = `https://api.themoviedb.org/3/trending/movie/day?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`
        else if(genre == 1) url = `https://api.themoviedb.org/3/movie/now_playing?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`
        else if(genre == 2) url = `https://api.themoviedb.org/3/movie/upcoming?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`
        else if(genre == 3) url = `https://api.themoviedb.org/3/movie/top_rated?api_key=6199da9940f55ef72ddc1512ea6eca9a&language=ko`
        else url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko&sort_by=${sort}&with_genres=${genre}&release_date.lte=${dateString}&vote_count.gte=50`

        //sort_by - vote_average.desc, popularity.desc, release_date.desc
        //vote_count.gte - 투표수

        for (let i = 1; i <= 3; i++) {
            await fetch(`${url}&page=${index * 3 + i}`)
                .then((response) => response.json())
                .then((data) => {
                    data.results.forEach((element) => {
                        responseMovieData.push(element)
                    })
                })
        }
        setMovieData(responseMovieData)
        setIndex(index + 1)
        setFetching(false)
    }

    useEffect(() => {
        responseMovieData = []
        setMovieData([])
        getMovie({sort: currentSort, genre: currentGenre})
    }, [currentGenre, currentSort])

    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000) {
            setFetching(true)
        }
    })

    useEffect(() => {
        if (isFetching && hasNextPage) getMovie({sort: currentSort, genre: currentGenre})
        else if (!hasNextPage) setFetching(false)
    }, [isFetching])

    return <MoviePageTemplate data={movieData} changeGenre={changeGenre} sortType={currentSort} changeSort={changeSort} />
}

export default MoviePage
