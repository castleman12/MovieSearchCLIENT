import {useState, useEffect} from 'react'
import {Button, Navbar} from 'reactstrap'
import Header from '../Navbar'
const Watchlist = (props) => {
    const [watchList, setWatchList] = useState([]);

    

    useEffect(() => {
      async function fetchResults(){
            let response = await fetch('http://localhost:3000/watchlist/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
             }
             })
            response = await response.json()
            setWatchList(response)
      }
            fetchResults()
        }, [])
            return(
                <div>
                    {localStorage.getItem('token') ? <ShowData watchList={watchList} /> : <div><h1>Please login!</h1></div>}
                </div>
        ) 
            }
    export default Watchlist

         const ShowData = (props) => {
            const deleteMovie = (id) => {
                    fetch(`http://localhost:3000/watchlist/delete/${id}`, {
                        method: 'DELETE',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem('token')
                       }
                    })
                }

            const updateMovie = (id) => {
                fetch(`http://localhost:3000/watchlist/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({watched: true}),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                "Authorization": localStorage.getItem('token')
                            })
                            })
                            .then((res) => res.json())
            }
            
            return (
                props.watchList.map((watchlist, index) => {
                return(
                    <div key={index} className="resultsContainer">
                    <img src={"https://image.tmdb.org/t/p/w500/"+ watchlist.posterPath}/>
                    <h1>{watchlist.title}</h1>
                    <p><b>Release Date:</b> <br/> {watchlist.releaseDate}</p>
                    <br/>
                    {watchlist.watched ? <Button id="watched">Watched!</Button> : <Button id="watched" onClick={() =>{updateMovie(watchlist.id)}}>Watched?</Button>}
                    <Button id="add" onClick={() => {deleteMovie(watchlist.id)}}>Remove from Watchlist!</Button>
                    </div>
                )
                })
            )
        }