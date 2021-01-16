import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <nav className="navbar sticky-top">
                <a className="navbar-brand" href="/"><img src="/images/logo-red.svg" className="logo"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown link</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        {/* <li className="nav-item header-social">
                            <span>
                                <img src="/images/icons/facebook.svg"/>
                                <img src="/images/icons/linkedin.svg"/>
                                <img src="/images/icons/twitter.svg"/>
                                <img src="/images/icons/instagram.svg"/>
                            </span>
                        </li> */}
                    </ul>
                    <div className="header-social">
                        <div>
                            <img src="/images/icons/facebook-white.svg"/>
                            <img src="/images/icons/linkedin-white.svg"/>
                            <img src="/images/icons/twitter-white.svg"/>
                            <img src="/images/icons/instagram-white.svg"/>
                            <span><a href="/login">Login | </a><a href="/login">Signup</a></span>
                            <img src="/images/icons/instagram-white.svg"/>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
