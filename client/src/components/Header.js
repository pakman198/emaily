import React from 'react';

const Header = () => {
  return (
    <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo">Emaily</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/auth/facebook">Login with Facebook</a></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header;