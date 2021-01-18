import React, { Component } from 'react'
import BlogCarousel from '../blog/BlogCarousel'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class FourOFour extends Component {
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
                    <h1 className="heading my-3"> 404 Error | This page does not exist</h1>
                    <p className="text-center">You seem to be lost my friend. Check our blogs while you are here or you can go back to the <a href="/" className="amitBtn">HOME PAGE</a></p>
                </div>
                <BlogCarousel blogs={this.state.blogs}/>
                <Footer/>
            </>
        )
    }
}

export default FourOFour