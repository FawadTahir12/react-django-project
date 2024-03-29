import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/User/userActions';
// import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import './style.scss';
import Logo from './../../assests/logo.png';
const mapState = (state) => ({
  currentUser: state.userState.user,
  // totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
//   const location = useLocation();
//   const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    console.log("hello");
    dispatch(logout());
  };

//   useEffect(() => {
//     setActiveMenu(false);
//   }, [location]);
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut LOGO" />
          </Link>
        </div>

         {/* <nav className={`mainMenu ${activeMenu ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search">
                Search
              </Link>
            </li>
          </ul>
        </nav>  */}

        <div className="callToActions">

          <ul>

            <li>
              {/* <Link to="/cart">
                Your Cart ({totalNumCartItems})
                <i class="fas fa-shopping-basket"></i>
              </Link> */}
            </li>

            {currentUser?.access && [
              <li key={1}>
                <Link to="/dashboard">
                  My Account
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
              <li key={2}>
                
                <span onClick={() => signOut()}>
                  LogOut
                  <i class="fas fa-sign-out-alt"></i>
                </span>
              </li>
            ]}

            {!currentUser?.access && [
              <li key={1} className="hideOnMobile">
                <Link to="/registration">
                  Register
                </Link>
              </li>
               , 
              <li key={2}>
                <Link to="/login">
                  Login
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>
             ]} 

            {/* <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li> */}

          </ul>





        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;