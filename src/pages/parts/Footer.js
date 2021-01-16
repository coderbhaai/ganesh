import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><img src="/images/icons/call-white.svg"/><span>88007 74985</span></li>
                                <li><img src="/images/icons/call-white.svg"/><span>All Days: 9: 00 AM - 8:00 PM</span></li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <h3>Socialize with Social</h3>
                            <ul>
                                <li><a href="#"><img src="/images/icons/facebook-white.svg"/></a></li>
                                <li><a href="#"><img src="/images/icons/linkedin-white.svg"/></a></li>
                                <li><a href="#"><img src="/images/icons/twitter-white.svg"/></a></li>
                                <li><a href="#"><img src="/images/icons/instagram-white.svg"/></a></li>
                            </ul>
                            <div className="text-center"><button className="btn">Enter Your Query</button></div>
                        </div>
                    </div>
                </div>
                <div className="akk">
                    <p className="text-center">Copyright 2018 Mangal Bhavan - All Rights Reserved</p>
                </div>
            </footer>
        )
    }
}

export default Footer
