import {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import './Watchlist.css'
import noPoster from './PosterNoFound.png'
import APIURL from '../../helpers/environment'
import MoreInfo from './StretchGoals/MoreInfo'

const Watchlist = (props) => {
    const [watchList, setWatchList] = useState([]);
    const [movieId, setMovieId] = useState('');
    const [infoActive, setInfoActive] = useState(false);

    const infoOn = () =>{
      setInfoActive(true);
    }
    
    const infoOff = () => {
      setInfoActive(false);
    }

    

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


        if(props.token){
            if(watchList.length < 1){
                return(
                    <div>
                        <h3>There are no movies on your Watchlist!</h3>
                        <br/>
                        <br/>
                        <Button style={{background: "rgb(27, 20, 112)", border: "0px"}} href="/">Search for a Movie!</Button>
                    </div>
                )
            } else {
                return(
                    <div>
                        <ShowData watchList={watchList} setMovieId={setMovieId} infoOn={infoOn}/>
                        {infoActive ? <MoreInfo  infoOff={infoOff} movieId={movieId} /> : null}
                    </div>
            )
            }
        } else {
            return(
                <div>
                    <div> <h3>No user logged in!</h3> <br/> <br/> <Button style={{background: "rgb(27, 20, 112)", border: "0px"}} href="/">Please Login or Sign Up!</Button></div>
                </div>
        ) }
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
                    {watchlist.posterPath ? <img alt={`poster for ${watchlist.title}`} src={"https://image.tmdb.org/t/p/w500/"+ watchlist.posterPath}/> : <img alt='no poster found' src={noPoster}/>}
                    <h1 id="title">{watchlist.title}</h1>
                    <p><b>Release Date:</b> <br/> {watchlist.releaseDate}</p>
                    <br/>
                    <Button type="submit" id="moreInfo" onClick={() => {
                    props.infoOn()
                    props.setMovieId(watchlist.movieDBid)}}>More Info</Button>
                    {watchlist.watched ? <Button id="watched">Watched!</Button> : <Button id="watched" onClick={() =>{updateMovie(watchlist.id)}}>Watched?</Button>}
                    <Button id="add" onClick={() => {deleteMovie(watchlist.id)}}>Remove from Watchlist!</Button>
                    </div>
                    </div>
                )}
                )
            )
                
        }