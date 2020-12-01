import {useState, useEffect} from 'react'
import {Button, Navbar} from 'reactstrap'
import Header from '../Navbar'
import { useAlert } from 'react-alert'
import './Watchlist.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import noPoster from './PosterNoFound.png'
import APIURL from '../../helpers/environment'

const Watchlist = (props) => {
    const [watchList, setWatchList] = useState([]);

    

    useEffect(() => {
      async function fetchResults(){
            let response = await fetch(`${APIURL}/watchlist/user`, {
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
                    {props.token ? <ShowData watchList={watchList} /> : <div><h1>Please login!</h1></div>}
                </div>
        ) 
            }
    export default Watchlist

         const ShowData = (props) => {
            const deleteMovie = (id) => {
                async function deletingMovie(id) {
                    let response = await fetch(`${APIURL}/watchlist/delete/${id}`, {
                        method: 'DELETE',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem('token')
                       }
                    })
                    response = await response.json()
                    window.location.reload(true)
                }
                deletingMovie(id)
            }


            const updateMovie = (id) => {
                fetch(`${APIURL}/watchlist/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({watched: true}),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                "Authorization": localStorage.getItem('token')
                            })
                            })
                            .then((res) => res.json())
                            .then(res => console.log(res))
                            .then(window.location.reload(true))

            }
            
            return (
                props.watchList.map((watchlist, index) => {
             
                return(
                    <div id="container">
                    <div key={index} id="resultsContainer">
                    {watchlist.posterPath ? <img src={"https://image.tmdb.org/t/p/w500/"+ watchlist.posterPath}/> : <img src={noPoster}/>}
                    <h1 id="title">{watchlist.title}</h1>
                    <p><b>Release Date:</b> <br/> {watchlist.releaseDate}</p>
                    <br/>
                    <Button type="submit" id="moreInfo" /*onClick={() => {MoreInfo(watchlist.id)}}*/>More Info</Button>
                    {watchlist.watched ? <Button id="watched">Watched!</Button> : <Button id="watched" onClick={() =>{updateMovie(watchlist.id)}}>Watched?</Button>}
                    <Button id="add" onClick={() => {deleteMovie(watchlist.id)}}>Remove from Watchlist!</Button>
                    </div>
                    </div>
                )}
                )
            )
                
        }