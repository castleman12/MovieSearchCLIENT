import { useEffect, useState } from "react";
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

const MoreInfo = (props) => {
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    async function fetchResults(){
        let imdbID = ""
        let response = await fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/external_ids?api_key=82b354b312b56da6907439cf056a2d21`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
        response = await response.json()
        imdbID = response.imdb_id
        let response2 = await fetch(`http://www.omdbapi.com/?apikey=2fd2161a&i=${imdbID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
            })
        response2 = await response2.json()
        console.log(response2)
        setMovieInfo(response2)
      }
      fetchResults()
      }, [])

  return (   
    <Modal isOpen={true}>
    <ModalHeader id="header"> <h3>{movieInfo.Title}</h3>
    < Button id="close" onClick={props.infoOff}>X</Button> </ModalHeader> 
        <ModalBody id="modal" >   
            <ul>
              <dt>Metascore:</dt>
              <dd>{movieInfo.Metascore}</dd>
              <dt>Runtime:</dt>
              <dd>{movieInfo.Runtime}</dd>
              <dt>Rated:</dt>
              <dd>{movieInfo.Rated}</dd>
              <dt>Director:</dt>
              <dd>{movieInfo.Director}</dd>
              <dt>Writer:</dt>
              <dd>{movieInfo.Writer}</dd>
              <dt>Actors:</dt>
              <dd>{movieInfo.Actors}</dd>
              <dt>Genre(s):</dt>
              <dd>{movieInfo.Genre}</dd>
              <dt>Plot:</dt>
              <dd>{movieInfo.Plot}</dd>
            </ul>
        </ModalBody>
    </Modal>
  )

}

export default MoreInfo;