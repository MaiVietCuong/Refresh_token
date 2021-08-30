import React from 'react'
import { Link } from 'react-router-dom';
import './TripDisplay.scss'

function TripDisplay({ accommodation, place }) {

    return (
        <div className='displays-page'>
            <div className="buttons">
                <Link to={`/place/${place.id}`}>
                    <button className='searchbtn' >
                        <i className="fas fa-search"></i>
                    </button>
                </Link>
                
                <button className='viewbtn'>
                    <i className="fas fa-eye" />
                </button>

                <button className="linkbtn">
                    <a href={place.url} key={place.id} target='_blank' rel="noreferrer">
                        <i className="fas fa-link"></i>
                    </a>
                </button>
            </div>

            <div className="name-des">
                <div className="name">
                    {place.name}
                </div>

                <div className="des">
                    {place.description}
                </div>
            </div>

            <div className="img">
                <img src={place.img} alt="img" />
            </div>
        </div>
    )
}
export default TripDisplay;