import React, { useContext, useEffect } from "react";
import { Globalstate } from "../../../GlobalState";
import Loading from "../../loading/Loading";
import Navbar from '../../main-navbar/Navbar'
import { Masonry } from "masonic";
import { Link } from 'react-router-dom'
import './HaNoiPlace.scss'
import icon from './icon.png'

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const PlaceCard = ({ data: { id, name, img, category } }) => (
    <div className="card">
        <img className='likebutton' src={icon} alt="likebutton" />
        <Link to={`/place/${id}`} target='_blank' rel='noreferrer'>
            <img className="img" alt={img} src={img} />
        </Link>
        <span children={name} />
        <span children={category} />
    </div>
);

export default function Places(props) {
    const state = useContext(Globalstate)
    const [places] = state.haNoiPlaceAPI.hanoiplaces

    useEffect(() => {
        shuffleArray(places)
    }, [places])

    return (
        <>
            <Navbar />
            <main className="container">
                <div className="masonic">
                    <header>
                        <h1>Attractions in Hanoi</h1>
                    </header>
                    {places.length === 0 && <Loading />}
                    <Masonry
                        // Provides the data for our grid items
                        items={places}
                        // Adds 8px of space between the grid cells
                        columnGutter={20}
                        // Sets the minimum column width to 172px
                        columnWidth={300}
                        // Pre-renders 5 windows worth of content
                        overscanBy={5}
                        // This is the grid item component
                        render={PlaceCard}
                    />
                </div>
            </main>
        </>
    )
}



// function HaNoiPlace() {
//     const state = useContext(Globalstate)
//     const [hanoiPlaces] = state.haNoiPlaceAPI.hanoiplaces
//     const [currentHisPage, setCurrentHisPage] = useState(1)
//     const [currentUrPage, setCurrentUrPage] = useState(1)
//     const [placesPerPage] = useState(3)

//     // console.log({ hanoiPlaces });

//     useEffect(() => {
//         if (hanoiPlaces.length !== 0) {
//             var slideIndex = 0;
//             showSlides();

//             function showSlides() {
//                 if (hanoiPlaces.length !== 0) {
//                     // var i;
//                     var slides = document.getElementsByClassName("slides");

//                     for (let i = 0; i < slides.length; i++) {
//                         slides[i].style.display = 'none';
//                     }
//                     slideIndex++;
//                     if (slideIndex > slides.length) {
//                         slideIndex = 1;
//                     }
//                     slides[slideIndex - 1].style.display = 'block';
//                     setTimeout(showSlides, 5000);
//                 }
//             }
//         }
//     }, [hanoiPlaces])

//     //Historical pagination
//     const indexOfLastHisPlace = currentHisPage * placesPerPage;
//     const indexOfFirstHisPlace = indexOfLastHisPlace - placesPerPage;

//     const totalHisPlaces = hanoiPlaces.filter(f => f.isHistorical === 1);
//     const totalHispage = Math.ceil(totalHisPlaces.length / placesPerPage)

//     const nextHisPage = () => {
//         if (currentHisPage !== totalHispage) {
//             setCurrentHisPage(currentHisPage + 1)
//         }
//     };

//     const prevHisPage = () => {
//         if (currentHisPage !== 1) {
//             setCurrentHisPage(currentHisPage - 1)
//         }
//     };


//     //Urban pagination
//     const indexOfLastUrPlace = currentUrPage * placesPerPage;
//     const indexOfFirstUrPlace = indexOfLastUrPlace - placesPerPage;

//     const totalUrPlaces = hanoiPlaces.filter(f => f.isUrban === 1);
//     const totalUrpage = Math.ceil(totalUrPlaces.length / placesPerPage)

//     const nextUrPage = () => {
//         if (currentUrPage !== totalUrpage) {
//             setCurrentUrPage(currentUrPage + 1)
//         }
//     };

//     const prevUrPage = () => {
//         if (currentUrPage !== 1) {
//             setCurrentUrPage(currentUrPage - 1)
//         }
//     };

//     return (
//         <>
//             {/* {hanoiPlaces && hanoiPlaces.length > 0
//                 ? hanoiPlaces.map(p => (
//                     <div className="dev" key={p.id}>
//                         {p.name}
//                     </div>
//                 ))
//                 : <Loading />
//             } */}
//             {hanoiPlaces && hanoiPlaces.length > 0 ? (
//                 <div className='hanoi-place'>
//                     <div className="navbar">
//                         <Navbar />
//                     </div>

//                     <div className="top">
//                         <div className="slideshow">
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/32/93/64/mausoleum.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/2c/0d/94/photo7jpg.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/49/4e/c9/c-u-long-bien.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/09/d8/lotte-skywalk.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/8d/10/50/fine-arts-museum-hanoi.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                             <div className="slides fade">
//                                 <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/ba/ec/68/militaire-geschiedenis.jpg?w=400&h=400&s=1' alt="img2" />
//                                 <div className="overlay"></div>
//                             </div>
//                         </div>

//                         <div className="top-text">
//                             <p className='where'>
//                                 Where in the world:{' '}
//                                 <span> Asia / Vietnam / Hanoi</span>
//                             </p>
//                             <h3>
//                                 ha noi
//                             </h3>
//                             <p className='cate'>
//                                 Historic Walking Areas · Adventure · Historic Sites
//                             </p>
//                             <p className="description">
//                                 The capital of Vietnam, Hanoi has bounded back from the effects of war, and today serves as a bustling commercial and cultural hub bursting at the seams. Chinese and French colonialism have left their mark in the city's architecture, replete with pagodas and European neoclassicism. But the recent history on display is a key part of any trip to Hanoi: the city's national museums, war memorials, and the "temple" to education at its university offer fascinating glimpses into the country's proud self-identification. Between the can't-miss attractions in Hanoi, spend time walking its crowded, motorbike-dense streets. Sample delectable street food and regional cuisines from all over the country, and spend your nights people-watching with a drink and a seat at a sidewalk table.
//                             </p>
//                         </div>
//                     </div>

//                     <div className="body">
//                         <div className="bd history">
//                             <h2>
//                                 Ha Noi's Historical Places
//                             </h2>

//                             <div className="display">
//                                 <button className="page-link left" onClick={() => prevHisPage()}>
//                                     <i className="fas fa-angle-left"></i>
//                                 </button>

//                                 {
//                                     hanoiPlaces.filter(f => f.isHistorical === 1).slice(indexOfFirstHisPlace, indexOfLastHisPlace).map(p => {
//                                         return <HaNoiDisplayPlace key={p.id} place={p} />
//                                     })
//                                 }

//                                 <button className="page-link right" onClick={() => nextHisPage()}>
//                                     <i className="fas fa-angle-right"></i>
//                                 </button>

//                             </div>
//                         </div>


//                         <div className=" bd urban">
//                             <h2>
//                                 Ha Noi's Urban Area
//                             </h2>

//                             <div className="display">
//                                 <button className="page-link left" onClick={() => prevUrPage()}>
//                                     <i className="fas fa-angle-left"></i>
//                                 </button>

//                                 {
//                                     hanoiPlaces.filter(f => f.isUrban === 1).slice(indexOfFirstUrPlace, indexOfLastUrPlace).map(p => {
//                                         return <HaNoiDisplayPlace key={p.id} place={p} />
//                                     })
//                                 }

//                                 <button className="page-link right" onClick={() => nextUrPage()}>
//                                     <i className="fas fa-angle-right"></i>
//                                 </button>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             ) : (
//                 <Loading />
//             )}
//         </>
//     )
// }
// export default HaNoiPlace