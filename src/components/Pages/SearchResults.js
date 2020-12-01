import {useState, useEffect} from 'react';
import { Button, Form } from 'reactstrap';
import { useAlert } from 'react-alert'
import './SearchResults.css';
import noPoster from './PosterNoFound.png'
import APIURL from '../../helpers/environment'
import Auth from '../Auth/Auth'

const SearchResults = (props) => {

    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        async function fetchResults(){
            let movies = []
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=82b354b312b56da6907439cf056a2d21&query=${props.search}&page=1`, {
            method: 'GET'
            })
            response = await response.json()
                for( let i = 1; i <= response.total_pages; i++){
                    let response2 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=82b354b312b56da6907439cf056a2d21&query=${props.search}&page=${i}`, {
            method: 'GET'
            })
            response2 = await response2.json()
                for(let i=0; i<response2.results.length; i++){
                    movies.push(response2.results[i])
                }
                }
            setSearchResults(movies);
        }
        fetchResults()
        }, [])


    if(props.search === ""){
        return(
        <h3>No search term entered Search Again?</h3>
        )
    } else {
        return(
            <div>
                <ShowData searchResults={searchResults} token={props.token} />
            </div>
    )}
}

export default SearchResults;

const ShowData = (props) => {
    const alert = useAlert()
    const [imdbID, setimdbID ] = useState('')




    const addMovie = (movie) => {

        async function addingMovie() {
            let response = await fetch(`${APIURL}/watchlist`, {
                method: 'POST',
                body: JSON.stringify({title: movie.title,
                posterPath: movie.poster_path,
                movieDBid: movie.id,
                releaseDate: movie.release_date,
                watched: false}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem('token')
                })
                })
             
            response = await response.json()
                  
            if (typeof response === "object") {
                if(response.error.name === "SequelizeUniqueConstraintError"){
                    alert.show('Movie already on Watchlist!')
                } else {
                    alert.error("There was a problem with the server, try again later!")
                }
            } else {
                alert.success(`${response}`)
            }
          } 
          addingMovie()
        }
    




  const MoreInfo = (id) => {
        // const [moreInfo, setMoreInfo] = useState([])

                fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=82b354b312b56da6907439cf056a2d21`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                    .then(res => res.json())
                    .then(data => setimdbID(data.imdb_id))
                    .then(console.log(imdbID))
                    .then(
                        fetch(`http://www.omdbapi.com/?apikey=2fd2161a&?i=${imdbID}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }   
                            })
                            .then(res => res.json())
                            .then(data => console.log(data))
                    )

    }

    return (
        props.searchResults.map((movie, index) => {
        return(
            <div id="container">
            <div key={index} id="resultsContainer">
            {movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500/"+ movie.poster_path}/> : <img src={noPoster}/>}
            <h1 id="title">{movie.title}</h1>
            <p><b>Release Date:</b> <br/> {movie.release_date}</p>
            <br/>
           <Button type="submit" id="moreInfo" onClick={() => {MoreInfo(movie.id)}}>More Info</Button>
            {localStorage.getItem('token') ?<Button id="add" onClick={() => {addMovie(movie)}}>Add to Watchlist!</Button> : <Button id="add" href="/">Make an Account!</Button>  } 
            </div>
            </div>
        )
        })
    )
    
}  

// const MoreInfo = (id) => {

// // const [moreInfo, setMoreInfo] = useState([])

// const [imdbID, setimdbID ] = useState([])

// useEffect(() => {

//        fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=82b354b312b56da6907439cf056a2d21`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//              }
//         })
//         .then(res => res.json())
//         .then(data => setimdbID(data.imdb_id))
//         .then(console.log(imdbID))
//     }
   
   
//     , [])
// }

// useEffect(() => {
    // async function fetchResults(){
    //     let response = await fetch(`http://www.omdbapi.com/?apikey= 2fd2161a&`, {
    //     method: 'GET'
    //     })
    //     response = await response.json()
    //     setSearchResults(response.results)
    // }
//     fetchResults()
//     }, [])
    
// }

