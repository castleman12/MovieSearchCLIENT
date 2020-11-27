import {useState, useEffect} from 'react'
import {Button, Navbar} from 'reactstrap'
import Header from '../Navbar'
import deleteMovie from './deleteMovie'

const Watchlist = (props) => {


    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
      
            fetch('http://localhost:3000/watchlist/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NTAxMDk5LCJleHAiOjE2MDY1ODc0OTl9.ThyQt3YdDzuQb9w-EZyQm4ZiluCErOw7y453-oYMIoM'
             }
             })
            .then(res => res.json())
            .then(data => setWatchList(data))
        }, [])

     
            return(
                <div>
                    
                    <ShowData watchList={watchList} />
                </div>
        ) 
    
                
            
            }
    export default Watchlist

          
            
         const ShowData = (props) => {

            return (
                props.watchList.map((watchlist, index) => {
                return(
                    <div key={index} className="resultsContainer">
                    <img src={"https://image.tmdb.org/t/p/w500/"+ watchlist.poster_path}/>
                    <h1>{watchlist.title}</h1>
                    <p><b>Release Date:</b> <br/> {watchlist.release_date}</p>
                 
                    <br/>
                    {watchlist.watched ? <Button id="watched">Watched!</Button> : <Button id="watched">Watched?</Button>}
                    <Button id="add" onClick={deleteMovie}>Remove from Watchlist!</Button>
                    </div>
                )
                })
            )
        }

    

