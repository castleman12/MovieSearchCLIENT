import {useState, useEffect} from 'react';
import {Button} from 'reactstrap';
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
                <ShowData searchResults={searchResults} />
            </div>
    )}
}

export default SearchResults;

const ShowData = (props) => {

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
            <Button id="add">Add to Watchlist!</Button>
            </div>
        )
        })
    )
}