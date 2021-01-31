import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class Terms extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="heading">Terms And Conditions</h1>
                            <p>These listed terms &amp; conditions apply to the concerned person who is a registered member and a subscriber of our online services. The use of this website is subject to the following terms of use.</p>
                            <ul>
                                <li>By utilizing Pujarambh.com, you are agreed to the company’s law.</li>
                                <li>All the contents of this website are general information, which is subject to change without declaration.</li>
                                <li>We are incapable to provide you any guarantee or warranty regarding the performance of the rituals, accuracy, timeline, or appropriateness of the materials &amp; information presented on this website for any particular reason.</li>
                                <li>We are unable to guarantee that the listed services, products, information will meet your requirements &amp; expectations.</li>
                                <li>You agree to be bound by the Terms and Conditions by using the e-pooja/online offering services of the Temple.</li>
                                <li>All the prices (if not indicated) are in INR/ Indian Rupees.</li>
                                <li>All the charges and availability of Pujarambh Services are subject to change without earlier notice.</li>
                                <li>The Temples reserve the right to decline or revoke any order placed for a particular Puja/ Product/Prasad or any other services listed inappropriately.</li>
                                <li>For security &amp; safety, in a credit or debit card transaction, please use your own card. Neither we nor the temple will be liable for any credit card fraud conditions.</li>
                                <li>Once your order is placed, request for cancellations will not be entertained by us.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Terms
