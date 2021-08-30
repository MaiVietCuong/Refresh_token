import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import UserInfoAPI from './api/UserInfoAPI'
import AccommodationDetail from './pages/accommodation/AccommodationDetail'
import AdminPanel from './pages/admin_panel/AdminPanel'
import CreateAccommodation from './pages/create_accommodation/CreateAccommodation'
import { CreatePlace } from './pages/create_place/CreatePlace'
import Places from './pages/hanoi-place/HaNoiPlace'
import PlaceDetail from './pages/hanoi-place/PlaceDetail'
import { LandingLogin } from './pages/login-landing-page/LandingLogin'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import RegisterInterest from './pages/register/RegisterInterest'
import CreateTrip from './pages/trip/CreateTrip'
import WelcomePage from './pages/welcome-page/Welcome-page'


function Pages() {
    const [isLogin] = useState(JSON.parse(localStorage.getItem('isLogin')))
    const [token] = useState(localStorage.getItem('token'))

    return (
        <Switch>
            <Route path='/' exact component={isLogin && token ? LandingLogin : WelcomePage} />

            <Route path='/place' exact component={Places} />
            <Route path='/place/:id' exact component={PlaceDetail} />

            <Route path='/createPlace' exact component={CreatePlace} />
            <Route path='/editPlace/:id' exact component={CreatePlace} />

            <Route path='/accommodation/:id' exact component={AccommodationDetail} />
            <Route path='/createAccommodation' exact component={CreateAccommodation} />
            <Route path='/editAccommodation/:id' exact component={CreateAccommodation} />

            <Route path='/register' exact component={Register} />
            <Route path='/rInterest' exact component={RegisterInterest} />

            <Route path='/login' exact component={Login} />
            <Route path='/profile' exact component={UserInfoAPI} />
            <Route path='/admin' exact component={AdminPanel} />

            <Route path='/itinerary' exact component={CreateTrip} />
        </Switch>
    )
}
export default Pages