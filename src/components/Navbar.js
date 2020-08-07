  
import React from "react";
import SearchBar from './Searchbar';
import "./Navbar.css";
import Logo from "../images/logo.svg";
import FavFilled from '../images/fav_filled.svg'

const Navbar = ({ sticky, onChangeFilter, onClickFav }) => {
return (
  <nav className={sticky ? "navbar navbar-sticky sticky-top" : "navbar"}>
    <div className="navbar--logo-holder">
      {sticky ? <img src={Logo} alt="logo" className="navbar--logo" /> : null}
      <SearchBar onChangeFilter={onChangeFilter}/>
    </div>
    <ul className="navbar--link">
      <li onClick={onClickFav} className="navbar--link-item"><img src={FavFilled} alt="fav icon" className="navbar--logo" /></li>
    </ul>
  </nav>
)};
export default Navbar;