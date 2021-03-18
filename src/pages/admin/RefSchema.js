import React, { Component} from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import moment from "moment"

export class Schema extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:                  [],
            products:               [],
            reviews:                [],
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/admin/schemaData')
        const body = await response.json();
        console.log(`body`, body)
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            blogs:              body.blogs,
            products:           body.products,
            reviews:            body.reviews
        })

    }
    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }

    _renderproductsList(){
        const siteName = "https://www.pujarambh.com/"
        var currentdate = new Date();
        var newDate = new Date(currentdate.setMonth(currentdate.getMonth()+8));
        return  this.state.products.map((i, index)=>{ 
            return(
                <div className="col-sm-12 " key={index}>
                    <p className="ml4">{"{"}</p>
                        <p className="ml5">"@context":"http://schema.org",</p>
                        <p className="ml5">"@type": "Product",</p>
                        {i.rating && JSON.parse(i.rating)[0]>0?
                            <p className="ml5">"aggregateRating": {'{'} "@type": "AggregateRating", "ratingValue": "{JSON.parse(i.rating)[0]}", "reviewCount": "{JSON.parse(i.rating)[0]}" {'}'},</p>
                        : 
                        <p className="ml5">"aggregateRating": {'{'} "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "1" {'}'},</p>
                        }
                        <p className="ml5">"description": "<section className="ckeContent" dangerouslySetInnerHTML={{ __html: i.shortDesc }}/>",</p>
                        <p className="ml5">"name": "{i.name}",</p>
                        <p className="ml5">"sku": "Pujarambh-{i.id}",</p>
                        <p className="ml5">"brand": "Pujarambh",</p>
                        <p className="ml5">"mpn": "{i.id}{Math.random().toString().substr(2, 6)}",</p>
                        <p className="ml5">"image": "{"https://www.pujarambh.com/images/product/"+JSON.parse(i.images)[0]}",</p>
                        <p className="ml5">"offers": {'{'}</p>
                            <p className="ml6">"@type": "Offer",</p>
                            <p className="ml6">"availability": "https://schema.org/InStock",</p>
                            <p className="ml6">"price": "{i.sale? i.sale : i.price-10}",</p>
                            <p className="ml6">"priceCurrency": "INR",</p>
                            <p className="ml5">"url": "https://www.pujarambh.com/product/{i.url}",</p>
                            <p className="ml6">"priceValidUntil": "{moment(newDate).format("DD MMMM YYYY")}"</p>
                        <p className="ml5">{'},'}</p>
                        <p className="ml5">"review":{"["}</p>
                            {this.state.reviews.filter(j=>j.productId == i.id).map((j,index2)=>(
                                <div key={index2}>
                                    <p className="ml6">{'{'}</p>
                                        <p className="ml7">"@type": "Review",</p>
                                        <p className="ml7">"author": "{j.name}",</p>
                                        <p className="ml7">"datePublished": "{moment(j.updated_at).format("DD MMMM  YYYY")}",</p>
                                        <p className="ml7">"reviewBody": "<section className="ckeContent" dangerouslySetInnerHTML={{ __html: j.review }}/>",</p>
                                        <p className="ml7">"name": "Pujarambh Customer",</p>
                                        <p className="ml7">"reviewRating": {'{'}</p>
                                            <p className="ml7">"@type": "Rating",</p>
                                            <p className="ml7">"bestRating": "5",</p>
                                            <p className="ml7">"ratingValue": "{j.rating}",</p>
                                            <p className="ml7">"worstRating": "0"</p>
                                        <p className="ml6">{'}'}</p>
                                    <p className="ml6">{"},"}</p>
                                </div>
                            ))}
                        {!this.state.reviews.filter(j=>j.productId == i.id).length?
                            <div>
                                <p className="ml6">{'{'}</p>
                                    <p className="ml7">"@type": "Review",</p>
                                    <p className="ml7">"author": "Amit Khare",</p>
                                    <p className="ml7">"datePublished": "{moment(currentdate).format("DD MMMM  YYYY")}",</p>
                                    <p className="ml7">"reviewBody": "The best product I had for my family.",</p>
                                    <p className="ml7">"name": "Pujarambh Customer",</p>
                                    <p className="ml7">"reviewRating": {'{'}</p>
                                        <p className="ml7">"@type": "Rating",</p>
                                        <p className="ml7">"bestRating": "5",</p>
                                        <p className="ml7">"ratingValue": "5",</p>
                                        <p className="ml7">"worstRating": "0"</p>
                                    <p className="ml6">{'}'}</p>
                                <p className="ml6">{"}"}</p>
                            </div>
                        : null}
                        <p className="ml5">{"]"}</p>
                        { <p className="ml4">{"},"}</p> }
                        {/* { this.state.products.length-1 == index ? <p className="ml4">{"}"}</p> :<p className="ml4">{"},"}</p> } */}
                </div>
            )
        })
    }

    _renderBlogList(){
        const siteName = "https://www.pujarambh.com/"
        var currentdate = new Date();
        return  this.state.blogs.map((i, index)=>{ 
            return(
                <div className="col-sm-12 " key={index}>
                    <p className="ml4">{"{"}</p>
                    <p className="ml5">"@context":"http://schema.org",</p>
                    <p className="ml5">"@type": "BlogPosting",</p>
                    <p className="ml5">"image": {'{'}"@type": "imageObject", "url": "{siteName}images/blog/{i.cover_img}"{'}'},</p>
                    <p className="ml5">"url": "{siteName}{i.url}",</p>
                    <p className="ml5">"headline": "{i.title}",</p>
                    <p className="ml5">"dateCreated": "{moment(i.updated_at).format("DD MMMM  YYYY")}",</p>
                    <p className="ml5">"datePublished": "{moment(i.updated_at).format("DD MMMM  YYYY")}",</p>
                    <p className="ml5">"datemodified": "{moment(i.updated_at).format("DD MMMM  YYYY")}",</p>
                    <p className="ml5">"inLanguage": "English",</p>
                    <p className="ml5">"isFamilyFriendly": "true",</p>
                    <p className="ml5">"copyrightYear": {currentdate.getFullYear()},</p>
                    <p className="ml5">"copyrightHolder": "Pujarambh",</p>
                    <p className="ml5">"author": "Pujarambh",</p>
                    <p className="ml5">"mainEntityOfPage": "True",</p>
                    <p className="ml5">"creator": {'{'}"@type": "Organization", "name": "Pujarambh", "url": "{siteName}"{"},"}</p>
                    <p className="ml5">"publisher": {'{'}"@type": "Organization", "name": "Pujarambh", "url": "{siteName}", "logo": {'{'}"@type": "ImageObject", "url": "{siteName}images/logo.png"{'}}'}</p>
                    { this.state.blogs.length-1 == index ? <p className="ml4">{"}"}</p> :<p className="ml4">{"},"}</p> }
                </div>
            )
        })
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading">Schema </h1>
                            <p>{'<script type="application/ld+json">'}</p>
                            <p className="ml1">{"{"}</p>
                            <p className="ml2">"@context":             "http://www.schema.org",</p>
                            <p className="ml2">"@type":                "LocalBusiness",</p>
                            <p className="ml2">"@id":                  "https://www.pujarambh.com/",</p>
                            <p className="ml2">"url":                  "https://www.pujarambh.com/",</p>
                            <p className="ml2">"name" :                "Pujarambh",</p>
                            <p className="ml2">"description" :         "We provide online Pandit ji along with complete solution for prayers and worship at affordable costs  ",</p>
                            <p className="ml2">"logo":                 "https://www.pujarambh.com/images/logo.svg",</p>
                            <p className="ml2">"address":</p>
                            <p className="ml3">{"{"}</p>
                                    <p className="ml4">"@type" :           "PostalAddress",</p>
                                    <p className="ml4">"addressCountry" :  "IN",</p>
                                    <p className="ml4">"addressLocality" : "Sanjay Gandhi Transport Nagar",</p>
                                    <p className="ml4">"addressRegion" :   "Delhi",</p>
                                    <p className="ml4">"postalCode" :      "110042",</p>
                                    <p className="ml4">"streetAddress" :   "CW-593, opposite Indian Oil Petrol Pump"</p>
                            <p className="ml3">{"},"}</p>
                            <p className="ml2">"telephone" :           "+91-9870405987",</p>
                            <p className="ml2">"email":                "connect@pujarambh.com",</p>
                            <p className="ml2">"image" :               "https://www.pujarambh.com/images/logo.svg",</p>
                            <p className="ml2">"sameAs" :</p>
                            <p className="ml3">[</p>
                                    <p className="ml4">"https://www.facebook.com/Pujarambh",</p>
                                    <p className="ml4">"https://twitter.com/pujarambh",</p>
                                    <p className="ml4">"https://www.linkedin.com/in/pujarambh-the-beginning-092877207/",</p>
                                    <p className="ml4">"https://www.instagram.com/_pujarambh_/"</p>
                            <p className="ml3">],</p>
                            <p className="ml2">"priceRange" : "$5 - $3000",</p>
                            <p className="ml2">"@graph":</p>
                            <p className="ml3">[</p>
                                {this._renderproductsList()}
                                {this._renderBlogList()} 
                            <p className="ml3">]</p>
                            <p className="ml1">{'}'}</p>
                            <p className="ml">{'</script>'}</p>
                        </div>
                    </div>
                </div>
                <Footer/> 
            </>
        )
    }
}
export default Schema