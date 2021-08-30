import React, { useContext } from 'react'
import { Globalstate } from '../../../GlobalState'
import './PlaceSearch.scss'

export default function PlaceSearch({ setCurrentPage }) {
    const state = useContext(Globalstate)
    const [search, setSearch] = state.haNoiPlaceAPI.search
    const clearAll = () => {
        setSearch('')
    }
    return (
        <div className='search-bar'>
            <input className='search' type="text" value={search}
                placeholder='Enter place name' autoComplete='on'
                onChange={e => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                }} />
            <button className="clearAll" onClick={clearAll}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}
