import React from 'react'
import './AccomDisplay.scss'

export default function AccommodationDisplay({ accom, scroll }) {

    return (
        <>
            <div className='ac-displays-page'>
                <img src={accom.img} alt="" />
                <div className={scroll ? "text-block active" : "text-block"}>
                    <div className="leftt">
                        <h3 className="title">{accom.name} - {accom.city.name}</h3>
                        {accom.is3stars === 1 && (
                            <div className="s 3star">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        )}
                        {accom.is4stars === 1 && (
                            <div className="s 4star">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        )}
                        {accom.is5stars === 1 && (
                            <div className="s 5star">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        )}
                        {accom.isHomestay === 1 && (
                            <div className="s homestay">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        )}
                        {accom.score > 8.5 && (
                            <div className="sc ">
                                <p className='score fabulous'>{accom.score} </p>
                                <p>fabulous</p>
                            </div>
                        )}
                        {8.5 > accom.score > 8 && (
                            <div className="sc ">
                                <p className='score verygood'>{accom.score} </p>
                                <p>very good</p>
                            </div>
                        )}
                        {8 > accom.score > 7.5 && (
                            <div className="sc ">
                                <p className='score good'>{accom.score} </p>
                                <p>good</p>
                            </div>
                        )}
                        {accom.score < 7.5 && (
                            <div className="sc ">
                                <p className='score seemseem'>{accom.score} </p>
                                <p>Seems seem</p>
                            </div>
                        )}
                    </div>

                    <div className="rightt">
                        <div className="service1">
                            {accom.hasBreakfast ? (
                                <div className="has breakfast">
                                    <i className="fas fa-utensils"></i>
                                    Serve breakfast
                                </div>
                            ) : (
                                <div className="none">
                                    <i className="fas fa-ban"></i>
                                    No breakfast
                                </div>
                            )}
                            {accom.hasKitchen ? (
                                <div className="has kitchen">
                                    <i className="fas fa-bread-slice"></i>
                                    Has kitchen
                                </div>
                            ) : (
                                <div className="none">
                                    <i className="fas fa-ban"></i>
                                    No kitchen
                                </div>
                            )}
                        </div>

                        <div className="service2">
                            {accom.hasFreeCancel ? (
                                <div className="has free">
                                    <i className="fas fa-thumbs-up"></i>
                                    Free cancel
                                </div>
                            ) : (
                                <div className="none">
                                    <i className="fas fa-thumbs-down"></i>
                                    No free cancel
                                </div>
                            )}
                            {accom.hasNoPrepayment ? (
                                <div className="has prepaid">
                                    <i className="fas fa-check-square"></i>
                                    No prepaid
                                </div>
                            ) : (
                                <div className="none">
                                    <i className="fas fa-hand-holding-usd"></i>
                                    Prepaid
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
