import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
const func = require('../parts/functions')
import AstroForm from '../parts/AstroForm'

export class Astrology extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="heading">Get your free Kundli</h1>
                            <p>Kundli or Vedic horoscope shows the positions of your planets at the time of your birth and inter operates the relationship between stars and planets and their impact on your personal, professional, health, finance, and family life. Your Kundli give you the insights of the major milestones in life and the timing. Get your Free Kundli at Pujarambh, and talk to our expert astrologers to know its interpretation.</p>
                        </div>
                        <div className="col-sm-6">
                            {/* <h2 className="heading">FREE DAILY HOROSCOPES</h2> */}
                            <div className="row zodiac">
                                {func.astrology.map((i,index)=>(
                                    <div className="col-sm-4" key={index}>
                                        <div>
                                            <div className="zodiacImage"><img src={"/images/icons/"+i.image} alt={i.name}/></div>
                                            <h4>{i.name}</h4>
                                            <p>{i.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {/* <h2 className="heading">GET YOUR FREE KUNDLI</h2> */}
                            <AstroForm/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Astrology