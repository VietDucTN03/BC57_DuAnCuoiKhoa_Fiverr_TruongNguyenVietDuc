import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../assets/scss/pages/header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobAsyncThunkAction } from '../redux/reducers/JobReducer';
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, USER_LOGIN, USER_PROFILE } from '../util/config';
import { history } from '../index';
import unknownAvatar from '../assets/image/Avatar.jpg';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  // const [jobList, setJobList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const arrJob = useSelector((state) => state.jobReducer.arrJob);
  const { userLogin } = useSelector(state => state.userReducer);
  const userAvatar = useSelector((state) => state.userReducer.userProfile);

  const [isLoggedIn, setIsLoggedIn] = useState(!!userLogin);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      if (scroll >= 100 || location.pathname !== "/") {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllJobAsyncThunkAction());
  }, [dispatch]);

  const renderMenuJob = () => {
    return arrJob.map((job) => {
      const { tenLoaiCongViec, id, dsNhomChiTietLoai } = job;

      return (
        <li className="job_item" key={id}>
          <NavLink
            className="job-item-title"
            to={`/job-title/${id}`}
          >
            {tenLoaiCongViec}
          </NavLink>
          <ul className="job-item-detail">
            {dsNhomChiTietLoai.map((group) => {
              const { tenNhom, id, dsChiTietLoai } = group;

              return (
                <ul className="container-fluid" key={id}>
                  <li className="job-title">{tenNhom}</li>
                  {dsChiTietLoai.map((jobDetail) => {
                    const { id, tenChiTiet } = jobDetail;

                    return (
                      <li className="job-detail" key={id}>
                        <NavLink to={`/categories/${id}`}>
                          {tenChiTiet}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </ul>
        </li>
      );
    })
  }

  const handleGetKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/result/${keyword}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('tokenCyberSoft');
    localStorage.removeItem('userId');
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_PROFILE);
    setIsLoggedIn(false);
    history.push('/login');
  };

  const renderButtonProfile = () => {
    if (!isLoggedIn) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" aria-disabled="true" to="/register">Register</NavLink>
          </li>
          <li className="nav-item join">
            <NavLink className="join-btn nav-link" to="/login">Join</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <li className="nav-item dropdown show-user">
          <button class="nav-link user-profile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="user-info">
              {userAvatar?.avatar ? (
                <img src={userAvatar.avatar} alt="Avatar" className="user-avatar" />
              ) : (
                <img src={unknownAvatar} alt="Unknown Avatar" className="user-avatar" />
              )}
            </div>
          </button>
          <div className="dropdown-menu">
            <li className="nav-item d-flex">
              <i className="fa-solid fa-user" />
              <NavLink className="nav-link nav-profile" aria-disabled="true" to="/profile">Profile</NavLink>
            </li>
            <button onClick={handleLogout} className="dropdown-item logout">
              <i className="fa-solid fa-arrow-right-from-bracket" />
              Log Out
            </button>
          </div>
        </li>
      );
    }
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${isScrolled ? 'fixed-top' : ''}`}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className={`navbar-brand ${isScrolled ? 'scrolled' : ''}`} to="/">fiverr</NavLink>

            <div className={`header-search ${isScrolled ? '' : 'hidden'}`}>
              <form action="" className='search' onSubmit={handleSearch}>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Find Services" name="keyword" onChange={handleGetKeyword} />
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isScrolled ? 'scrolled' : ''}`}>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Become a Seller</NavLink>
              </li>
              {renderButtonProfile()}
            </ul>
          </div>
        </div>
      </nav>
      <section className={`job-menu ${isScrolled ? 'fixed-top' : ''}`}>
        <div className="menu-job">
          <ul className='job'>
            {renderMenuJob()}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Header;
