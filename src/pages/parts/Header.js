import React, { Component } from 'react'
import swal from 'sweetalert'
import axios from 'axios'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:              []
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){
            swal({ title: localStorage.getItem('message'),
            // timer: 4000
        })
            setTimeout(function() { localStorage.removeItem('message') }, 4000)
        }
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
    }

    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }

    logout = (e) =>{
        e.preventDefault()
        axios.post('/auth/logOut')
            .then(res=> {
                if(res.data.success){
                    localStorage.clear();
                    this.setState({ user: [] })
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/login'
                }
            })
            .catch(err=>console.log('err', err))
    }
    render() {
        return (
            <nav className="navbar sticky-top">
                <a className="navbar-brand" href="/"><img src="/images/logo-red.svg" className="logo"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/shop">Shop</a></li>
                        <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                        {this.state.user.role?
                            <>
                                {this.state.user.role==="Admin"? 
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.toSentenceCase(this.state.user.name)}</a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="/admin">Admin Panel</a>
                                            <a className="dropdown-item logout" onClick={this.logout}>Log Out</a>
                                        </div>
                                    </li>
                                : null }
                                {this.state.user.role==="User"? 
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.toSentenceCase(this.state.user.name)}</a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="/user-admin">Admin Panel</a>
                                            <a className="dropdown-item logout" onClick={this.logout}>Log Out</a>
                                        </div>
                                    </li>
                                : null }
                            </>
                        : null }
                    </ul>
                    <div className="header-social">
                        <div>
                            <img src="/images/icons/facebook-white.svg"/>
                            <img src="/images/icons/linkedin-white.svg"/>
                            <img src="/images/icons/twitter-white.svg"/>
                            <img src="/images/icons/instagram-white.svg"/>
                            {!this.state.user.role? <span><a href="/login">Login | </a><a href="/register">Signup</a></span> : null}
                            <a href="/cart">
                                <img src="/images/icons/cart.svg"/>
                                <span className='value'>{this.props.cart ? this.props.cart : 0 }</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
