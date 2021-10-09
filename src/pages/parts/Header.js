import React, { Component } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
const func = require('./functions')
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
// import 'react-select/dist/css/react-select.css';



export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:               [],
            selectedOption:     '',
            inputValue:         '' ,
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){
            swal({ title: localStorage.getItem('message'),
            timer: 4000
        })
            setTimeout(function() { localStorage.removeItem('message') }, 4000)
        }
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
        
    }

    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }

    logout = (e) =>{
        e.preventDefault()
        const data={
            email: this.state.user.email,
            id: this.state.user.id
        }
        axios.post('/auth/logOut', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.clear();
                    this.setState({ user: [] })
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/sign-up'
                }
            })
            .catch(err=>{ func.printError(err) })
    }

    fetchData = async (inputValue, callback) => {
        if(inputValue.length>2){
            const response = await fetch( '/search?text='+ inputValue); 
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            var tempArray = [];
            body.cats.forEach( i => {
                i['value'] = '/product-category/'+i.value
                tempArray.push (i)
            });
            body.products.forEach( i => {
                i['value'] = '/product/'+i.value
                tempArray.push (i)
            });
            callback(tempArray);
        }
    };

    onSearchChange = (selectedOption) => { window.location.href = selectedOption.value };

    render() {
        return (
            <header className="sticky-top">
                <nav className="navbar sticky-top container">
                    <a className="navbar-brand" href="/"><img src="/images/logo.svg" className="logo" alt="Pujarambh Logo" width="100" height="57"/></a>
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button> */}
                    <div className="cartToggle">
                        <div className="toggle-btn" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span></span><span></span><span></span></div>
                        <a href="/cart" className="cartIconMobilex cartIcon mobile"> <img src="/images/icons/cart-orange.svg" alt="add to cart" width="35" height="35"/><span className='value'>{this.props.cart ? this.props.cart : 0 }</span></a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="/shop">Shop</a></li>
                            {/* <li className="nav-item"><a className="nav-link" href="/product-category">Categories</a></li> */}
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
                                                <a className="dropdown-item" href="/user/admin">Admin Panel</a>
                                                <a className="dropdown-item logout" onClick={this.logout}>Log Out</a>
                                            </div>
                                        </li>
                                    : null }
                                </>
                            : 
                                <li className="nav-item"><a className="nav-link" href="/sign-up">Login | Signup</a></li> 
                            }
                            {/* <li className="nav-item">
                                <a href="/cart" className="cartIcon">
                                    <img src="/images/icons/cart-orange.svg" alt="add to cart" width="15" height="15"/>
                                    <span className='value'>{this.props.cart ? this.props.cart : 0 }</span>
                                </a>
                            </li> */}
                        </ul>
                        <div className="header-social">
                            <div className="search-container">
                                <AsyncSelect value={this.state.selectedOption} loadOptions={this.fetchData} placeholder="Search here" onChange={(e) => { this.onSearchChange(e); }} defaultOptions={true}/>
                                <a href="/cart" className="cartIcon web">
                                    <img src="/images/icons/cart-orange.svg" alt="add to cart" width="15" height="15"/>
                                    <span className='value'>{this.props.cart ? this.props.cart : 0 }</span>
                                </a>
                            </div>
                            {/* <a href="/cart" className="cartIcon"> <img src="/images/icons/cart-white.svg" alt="add to cart" width="15" height="15"/><span className='value'>{this.props.cart ? this.props.cart : 0 }</span></a> */}
                            {/* 
                            <div>
                                <a href="https://www.facebook.com/pujarambh1" target="_blank"><img src="/images/icons/facebook-white.svg" alt="Connect with Pujarambh on Facebook" width="15" height="15"/></a>
                                <a href="https://www.linkedin.com/in/pujarambh-the-beginning-092877207/" target="_blank"><img src="/images/icons/linkedin-white.svg" alt="Connect with Pujarambh on Linkedin" width="15" height="15"/></a>
                                <a href="https://twitter.com/pujarambh" target="_blank"><img src="/images/icons/twitter-white.svg" alt="Connect with Pujarambh on Twitter" width="15" height="15"/></a>
                                <a href="https://www.instagram.com/_pujarambh_/" target="_blank"><img src="/images/icons/instagram-white.svg" alt="Connect with Pujarambh on Instagram" width="15" height="15"/></a>
                                <a href="//api.whatsapp.com/send?phone=919870405987&amp;text= Hi, I got your number from Pujarambh Website." className="web"><img src="/images/icons/whatsapp-button.svg" alt="Connect with Pujarambh on Whats App" width="15" height="15"/></a>
                                {!this.state.user.role? <span><a href="/sign-up">Login | Signup</a></span> : null}
                                <a href="/cart" className="cartIcon"> <img src="/images/icons/cart-white.svg" alt="add to cart" width="15" height="15"/><span className='value'>{this.props.cart ? this.props.cart : 0 }</span></a>
                            </div>
                            */}
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
