import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
import Form from './Form'

export class Footer extends Component {
    render() {
        return (
            <>
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><img src="/images/icons/call-white.svg"/><span>987-04-05-987</span></li>
                                <li><img src="/images/icons/clock.svg"/><span>All Days: 9: 00 AM - 8:00 PM</span></li>
                            </ul>
                            <ul className="links">
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/terms-and-condition">Terms &amp; Conditions</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <h3>Socialize with Social</h3>
                            <ul>
                                <li><a href="https://www.facebook.com/Pujarambh" target="_blank"><img src="/images/icons/facebook-white.svg"/></a></li>
                                <li><a href="https://www.linkedin.com/in/pujarambh-the-beginning-092877207/" target="_blank"><img src="/images/icons/linkedin-white.svg"/></a></li>
                                <li><a href="https://twitter.com/pujarambh" target="_blank"><img src="/images/icons/twitter-white.svg"/></a></li>
                                <li><a href="https://www.instagram.com/_pujarambh_/" target="_blank"><img src="/images/icons/instagram-white.svg"/></a></li>
                            </ul>
                            <div className="text-center"><a className="btn" data-toggle="modal" data-target="#callBack">Enter Your Query</a></div>
                        </div>
                    </div>
                </div>
                <div className="akk">
                    <p>© 2021 Pujarambh - All Rights Reserved</p>
                    <p className="akkLink">Developed by <a href="https://www.amitkk.com" target="_blank">AmitKK</a></p>
                </div>
            </footer>
            <div className="callBack">
                <div className="modal fade" id="callBack" tabIndex="-1" role="dialog" aria-label="callBackTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="heading">Enter Your Query</h2>
                                <button data-dismiss="modal" aria-label="Close" className="closeBtn">X</button>
                            </div>
                            <div className="modal-body container">
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-6"><Form/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Footer
