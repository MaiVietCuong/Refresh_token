import React from 'react'
import './CuisineDisplay.scss'

export default function CuisineDisplay({ cuisine }) {

    const { category, city, img, name, price,
        isChinese, isIndian, isJapanese, isKorean, isThai, isVietnamese, isWestern } = cuisine

    return (
        <>
            <div className="cuisine-display-page">
                <div className="img">
                    <img src={img} alt={name} />
                </div>

                <div className="info">
                    <div className="name">
                        {name}
                    </div>
                    <div className="cuisine-hashtag">
                        <div className="lft">
                            {isChinese ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Chinese
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Chinese
                                </div>
                            )}

                            {isIndian ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Indian
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Indian
                                </div>
                            )}

                            {isJapanese ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Japanese
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Japanese
                                </div>
                            )}

                            {isKorean ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Korean
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Korean
                                </div>
                            )}
                        </div>

                        <div className="rgt">
                            {isThai ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Thai
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Thai
                                </div>
                            )}

                            {isVietnamese ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Vietnamese
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Vietnamese
                                </div>
                            )}

                            {isWestern ? (
                                <div className="true menu-box">
                                    <i className="fas fa-check"></i> Western
                                </div>
                            ) : (
                                <div className="false menu-box">
                                    <i className="fas fa-minus"></i> Western
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="description">
                    <p className='meal'>#{category}</p>

                    <p className='city'>#{city?.name}</p>

                    <p className='price'>{price} VND</p>
                </div>
            </div>
        </>
    )
}
