import React, { Component } from 'react'
import BlogCarousel from '../blog/BlogCarousel'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class ThankYou extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:              this.props.blogs,
            message:            ''
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/suggest'); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            blogs: body.blogs
        })
    }

    render() {        
        return (
            <>
                <Header/>
                <div className="container page py-5">
                    <h1 className="heading my-3">Thank You for connecting with us</h1>
                    <p className="text-center">We will reach back to you in a while.</p>
                </div>
                <BlogCarousel blogs={this.state.blogs}/>
                <Footer/>
            </>
        )
    }
}

export default ThankYou