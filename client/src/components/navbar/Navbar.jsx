import React, { useContext, useState } from 'react';
import './Navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import { useDebounce } from 'use-debounce';

function Navbar() {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  // const [debouncedValue] = useDebounce(search, 500);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('user');
    setCurrentUser(false);
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile/' + currentUser.id);
  };
  const goToSocial = async (e) => {
    if (e.key === 'Enter') {
      navigate('/social', { state: { search } });
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span>MIXSOCIAL</span>
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onKeyUp={(e) => goToSocial(e)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="right">
        <div className="icon">
          <NotificationsNoneOutlinedIcon />
          <div className="user" onClick={goToProfile}>
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </div>
        <button className="btn" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
