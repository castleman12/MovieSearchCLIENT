import {useState, useEffect} from 'react';
import {Button, Form} from 'reactstrap';
import './SearchResults.css';

const SearchResults = (props) => {

    const [searchResults, setSearchResults] = useState([]);
   

    useEffect(() => {
        async function fetchResults(){
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=82b354b312b56da6907439cf056a2d21&query=${props.search}&page=1`, {
            method: 'GET'
            })
            response = await response.json()
            setSearchResults(response.results)
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
    
    const addMovie = (movie) => {
        console.log(movie)
        fetch('http://localhost:3000/watchlist', {
            method: 'POST',
            body: JSON.stringify({title: movie.title,
            posterPath: movie.poster_path,
            movieDBid: movie.id,
            releaseDate: movie.release_date,
            watched: false}),
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": props.token
            })
            })
            .then((res) => res.json())
        }
    




  const MoreInfo = (id) => {
        // const [moreInfo, setMoreInfo] = useState([])
        const [imdbID, setimdbID ] = useState([])
        useEffect(() => {  
                fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=82b354b312b56da6907439cf056a2d21`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                
                    })
                    .then(res => res.json())
                    .then(data => setimdbID(data))
                
            
            }, [])
            console.log(imdbID)
    }

    return (
        props.searchResults.map((movie, index) => {
        return(
            <div key={index} className="resultsContainer">
            <img src={"https://image.tmdb.org/t/p/w500/"+ movie.poster_path}/>
            <h1>{movie.title}</h1>
            <p><b>Release Date:</b> <br/> {movie.release_date}</p>
            <p><b>About the film:</b> <br/>
                {movie.overview}</p>
            <br/>
           <Button type="submit" id="moreInfo" onClick={() => {MoreInfo(movie.id)}}>More Info</Button>
           <Button id="add" onClick={() => {addMovie(movie)}}>Add to Watchlist!</Button>
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
//     async function fetchResults(){
//         let response = await fetch(`http://www.omdbapi.com/?apikey= 2fd2161a&`, {
//         method: 'GET'
//         })
//         response = await response.json()
//         setSearchResults(response.results)
//     }
//     fetchResults()
//     }, [])
    
// }

