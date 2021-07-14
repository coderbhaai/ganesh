import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'

export class RefSitemap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:                  [],
            products:               [],
            blogMeta:               [],
            prodCat:                [],
            pages:                  [ 
                "cart", "shop", "blog", "sign-up", "about-us", "privacy-policy", "terms-and-condition", "free-kundli", "thank-you", "404"
            ],
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/admin/sitemapData')
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            blogs:                  body.blogs,
            products:               body.products,
            blogMeta:               body.blogMeta,
            prodCat:                body.prodCat,
        })
    }
    
    render() {
        const time = new Date().toISOString().slice(0, 19)
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10 sitemap">
                            <h1 className="heading">Schema </h1>
                            <p>{'<?xml version="1.0" encoding="UTF-8"?>'}</p>
                            <p>{'<urlset'}</p>
                            <p>{'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'}</p>
                            <p>{'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'}</p>
                            <p>{'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9'}</p>
                            <p>{'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'}</p>
                            <div className="ml1">
                                <p>{'<url>'}</p>
                                    <p className="ml2">{`<loc>https://www.pujarambh.com/</loc>`}</p>
                                    <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                    <p className="ml2">{`<priority>1.00</priority>`}</p>
                                <p>{'</url>'}</p>
                            </div>
                            {this.state.pages.map((i,index)=>(
                                <div className="ml1" key={index}>
                                    <p>{'<url>'}</p>
                                        <p className="ml2">{`<loc>https://www.pujarambh.com/${i}</loc>`}</p>
                                        <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                        <p className="ml2">{`<priority>1.00</priority>`}</p>
                                    <p>{'</url>'}</p>
                                </div>
                            ))}
                            {this.state.blogs.map((i,index)=>(
                                <div className="ml1" key={index}>
                                    <p>{'<url>'}</p>
                                        <p className="ml2">{`<loc>https://www.pujarambh.com/${i.url}</loc>`}</p>
                                        <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                        <p className="ml2">{`<priority>.80</priority>`}</p>
                                    <p>{'</url>'}</p>
                                </div>
                            ))}
                            {this.state.products.map((i,index)=>(
                                <div className="ml1" key={index}>
                                    <p>{'<url>'}</p>
                                        <p className="ml2">{`<loc>https://www.pujarambh.com/product/${i.url}</loc>`}</p>
                                        <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                        <p className="ml2">{`<priority>.70</priority>`}</p>
                                    <p>{'</url>'}</p>
                                </div>
                            ))}
                            {this.state.blogMeta.map((i,index)=>(
                                <div className="ml1" key={index}>
                                    <p>{'<url>'}</p>
                                        <p className="ml2">{`<loc>https://www.pujarambh.com/${i.type}/${i.url}</loc>`}</p>
                                        <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                        <p className="ml2">{`<priority>.70</priority>`}</p>
                                    <p>{'</url>'}</p>
                                </div>
                            ))}
                            {this.state.prodCat.map((i,index)=>(
                                <div className="ml1" key={index}>
                                    <p>{'<url>'}</p>
                                        <p className="ml2">{`<loc>https://www.pujarambh.com/product-category/${i.tab1}</loc>`}</p>
                                        <p className="ml2">{`<lastmod>${time}+00:00</lastmod>`}</p>
                                        <p className="ml2">{`<priority>.60</priority>`}</p>
                                    <p>{'</url>'}</p>
                                </div>
                            ))}
                            <p>{'</urlset> '}</p>
                        </div>
                    </div>
                </div>
                <Footer/> 
            </>
        )
    }
}

export default RefSitemap
