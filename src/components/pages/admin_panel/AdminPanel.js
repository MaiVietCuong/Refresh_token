import React, { useContext, useState } from "react";
import { Globalstate } from "../../../GlobalState";
import Navbar from '../../main-navbar/Navbar'
import './AdminPanel.scss'
import Place from "./placeTable/Place";
import Accommodation from "./accommodationTable/Accommodation";

export default function AdminPanel(props) {
    const state = useContext(Globalstate)
    const [token] = state.token
    const [authAdmin] = state.userInfoAPI.authAdmin
    const [hanoiPlaces] = state.haNoiPlaceAPI.hanoiplaces
    const [callback, setCallBack] = state.haNoiPlaceAPI.callback
    const [accommodations] = state.accommodationAPI.accommodations
    const [accomCallBack, setAccomCallBack] = state.accommodationAPI.callback
    const [tag, setTag] = useState(false)

    return (
        <div className='admin-panel'>
            <div className="row">
                <div className="col-4">
                    <div className="admin-control">
                        <div className="a-c-header">
                            <i className="fas fa-user-tie"></i>
                            <div className="a-c-name">
                                David Beckham
                                <div className="a-c-status">
                                    <div className="dot"></div> Online
                                </div>
                            </div>
                        </div>

                        <div className="a-c-select-field">
                            <div className="a-c administration">
                                <div className="tag">
                                    <i className="fas fa-user-shield"></i> administration
                                </div>
                                <div className="content">
                                    <div className="ct dashboard">
                                        <i className="fas fa-home"></i> dashboard
                                    </div>

                                    <div className="ct permission">
                                        <i className="fas fa-users"></i> Users, Roles, Permissions
                                    </div>
                                </div>
                            </div>

                            <div className="a-c page">
                                <div className="tag">
                                    <i className="fas fa-newspaper"></i> page
                                </div>

                                <div className="content">
                                    <div className="ct place" onClick={() => setTag(false)}>
                                        <i className="fas fa-landmark"></i> Place
                                    </div>

                                    <div className="ct accommodation" onClick={() => setTag(true)}>
                                        <i className="fas fa-bed"></i> Accommodation
                                    </div>
                                </div>
                            </div>

                            <div className="a-c advanced">
                                <div className="tag">
                                    <i className="fas fa-cogs"></i> advanced
                                </div>

                                <div className="content">
                                    <div className="ct term">
                                        <i className="fas fa-file-signature"></i> term of service
                                    </div>

                                    <div className="ct logout">
                                        <i className="fas fa-sign-out-alt"></i> logout
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-8">
                    <div className="navbar">
                        <Navbar />
                    </div>

                    <div className="body">
                        {tag ? (
                            <Accommodation token={token} authAdmin={authAdmin} accommodations={accommodations} callback={accomCallBack} setCallBack={setAccomCallBack} />
                        ) : (
                            <Place token={token} authAdmin={authAdmin} places={hanoiPlaces} callback={callback} setCallBack={setCallBack} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
