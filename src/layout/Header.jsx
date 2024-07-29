import {React} from 'react'


const Header = () => {
    function logout() {
      sessionStorage.clear();
      window.location.replace('/');
    }
    let userFullName=  sessionStorage.getItem("user_fullname");
  return (

    <div
  className="vertical-layout vertical-menu-modern  navbar-floating footer-static  "
  data-open="click"
  data-menu="vertical-menu-modern"
  data-col=""
>
<nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
  <div className="navbar-container d-flex content">
    <div className="bookmark-wrapper d-flex align-items-center">
    </div>
    <ul className="nav navbar-nav align-items-center ms-auto">
      <li className="nav-item dropdown dropdown-user">
        <a
          className="nav-link dropdown-toggle dropdown-user-link"
          id="dropdown-user"
          href="#"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name fw-bolder">{userFullName}</span>
          </div>
          <span className="avatar">
            <img
              className="round"
              src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
              alt="avatar"
              height={40}
              width={40}
            />
            <span className="avatar-status-online" />
          </span>
        </a>
        <div
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdown-user"
        >
          {/* <a className="dropdown-item" href="page-profile.html">
            <i className="me-50" data-feather="user" /> Profile
          </a> */}
          <div className="dropdown-divider" />
          <a className="dropdown-item"  onClick={logout}>
            <i className="me-50" data-feather="power"/> Logout
          </a>
        </div>
      </li>
    </ul>
  </div>
</nav>
</div>


  );
}

export default Header;