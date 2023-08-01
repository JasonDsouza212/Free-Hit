import React, {useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import freehitlogo from '../assets/logo.png'
import freehitlogodark from '../assets/darkmode-logo.png'
import { useLocation } from 'react-router-dom'
import { NavLink, useSearchParams } from "react-router-dom"
import "../styles/header.css"
import Sidebar from './Sidebar'
import { ToolContext } from '../App';
import { useContext } from 'react';
import mobilelogo from '../assets/mobileview.png'
import { useState } from 'react'


const Header = ({ filteredSuggestions }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { darkMode ,debounce } = useContext(ToolContext);
  const location = useLocation()
  const sideNavRef = useRef(null)
  const [search ,setSearch]=useState('')
  const[screenWidth,setScreenWidth]=useState(window.innerWidth);
  const[isScreenSmall,setIsScreenSmall]=useState(false);
  useEffect(()=>{
    const changeWidth=()=>{
      setScreenWidth(window.innerWidth);
      setIsScreenSmall(window.innerWidth<520);
    }
    window.addEventListener('resize',changeWidth);
    return()=>{
      window.removeEventListener('resize',changeWidth);
    }
  },[screenWidth])
  console.log(isScreenSmall);
  
  const searchTerm = searchParams.get('q') || ''

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      document.getElementById("btn").checked = false;
    }
  }
  window.addEventListener('scroll', function(){
    if (sideNavRef.current) {
      document.getElementById("btn").checked = false;
    }
  })

  function setSearchTerm(val) {
    setSearchParams(prevParams => {
      if (val == "") {
        prevParams.delete('q')
      } else {
        prevParams.set('q', val)
      }
      return prevParams
    })
  }
  const handleChangeInInput = (event) => {
    const val = event.target.value
    setSearchTerm(val)
    setSearch(val)
  debounce(setSearchTerm,500)(val);
  }

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`nav-container ${darkMode ? 'dark-mode' : ''}`} ref={sideNavRef}>
        <Sidebar />
        
        <div className={`Free-Hit ${darkMode ? 'dark-mode' : ''}`}>
          {!isScreenSmall && (  <NavLink to="/about" className='nav-link'>
          <img
            className={`free-logo ${darkMode ? 'dark-mode' : ''}`}
            src={darkMode ? freehitlogodark : freehitlogo}
            alt="logo"
          />
          </NavLink>)}

          {
            isScreenSmall && ( <NavLink to="/about" className='nav-link'>
            <img
              className={`mobile-logo ${darkMode ? 'dark-mode' : ''}`}
              src={darkMode ? mobilelogo : mobilelogo}
              alt="logo"
            />
            </NavLink>)
          }
        
         
        </div>
      </div>
      {location.pathname !== '/about' && location.pathname !== '/community' && (
        <div className="container">
          <div className="search_box">
            <input
              type="text"
              className="input"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleChangeInInput(e)}
            />
            <div className="btn btn_common">
              <i className="fas fa-search">
                <FaSearch />
              </i>
            </div>
          </div>
          {(filteredSuggestions.length > 1 || (filteredSuggestions.length > 0 && filteredSuggestions[0] != searchTerm)) && (
            <ul className="hnav-suggestionbar" id="serch-suggestions">
              {/* This shows as a list of suggestions based on the search term */}
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setSearchTerm(suggestion)
                    setSearch(suggestion)
                  }}
                  className="hnav-suggestion"
                >
                  {suggestion.charAt(0).toUpperCase()+suggestion.slice(1,)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <ul className="pages">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className="hoverele" to="/bookmarks">Bookmarks</NavLink>
        </li>
        <li>
          <NavLink className="hoverele" to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header
