import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class About extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="heading">About Us</h1>
                            <p>Pujarambh is end to your search for qualified pandit/purohits for any puja or hawan and authentic puja samagri for all rituals along with consultation from pandits for shubh muhurat and vastu.</p>
                            <p>We have a large network of pandits which we connects with customers to organize puja or consultations and by utilizing the individual expertise of pandits we are able to provide a better experience for customers participating in the ceremonies.</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default About
