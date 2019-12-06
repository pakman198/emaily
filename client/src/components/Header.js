import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments';

const Header = () => {
  // this hook is like the mapStateToProps param on the connect
  const auth = useSelector(state => state.auth);

  console.log({ auth })

  const renderContent = (auth) => {
    switch(auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/facebook">Login with Facebook</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link 
          to={ auth ? '/surveys' : '/' } 
          className="brand-logo"
        >
            Emaily
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          { renderContent(auth) }
        </ul>
      </div>
    </nav>
  )
}

export default Header;