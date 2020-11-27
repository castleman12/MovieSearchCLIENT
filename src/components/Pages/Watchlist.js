import {useState, useEffect} from 'react'
import {Button, Navbar} from 'reactstrap'
import Header from '../Navbar'

const Watchlist = (props) => {


    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
      
            fetch('http://localhost:3000/watchlist/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': props.token
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

            const deleteMovie = (id) => {
              console.log(id)
                    fetch(`http://localhost:3000/watchlist/delete/${id}`, {
                        method: 'DELETE',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': props.token
                       }
                    
                    })
                }
                    

            return (
                props.watchList.map((watchlist, index) => {
                return(
                    <div key={index} className="resultsContainer">
                    <img src={"https://image.tmdb.org/t/p/w500/"+ watchlist.poster_path}/>
                    <h1>{watchlist.title}</h1>
                    <p><b>Release Date:</b> <br/> {watchlist.release_date}</p>
                 
                    <br/>
                    {watchlist.watched ? <Button id="watched">Watched!</Button> : <Button id="watched">Watched?</Button>}
                    <Button id="add" onClick={deleteMovie(watchlist.id)}>Remove from Watchlist!</Button>
                    </div>
                )
                })
            )
        }

    

