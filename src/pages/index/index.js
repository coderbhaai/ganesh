import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Swiper from 'react-id-swiper'
import ProductSwiper from '../parts/ProductSwiper'
import ServiceSwiper from '../parts/ServiceSwiper'
const func = require('../parts/functions')

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:                  this.props.blogs,
            products:               this.props.products,
            puja:                   [],
            astro:                  [],
            samagri:                [],
            decor:                  [],
            cart:                   [],
            active:                 'Service'
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
    }

    callApi = async () => {
        const response = await fetch( '/getHomeData' ); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        var puja =[]; var astro =[]; var samagri =[]; var decor =[]; 
        body.products.forEach(i => {
            if(i.type==1){ puja.push(i)}
            if(i.type==2){ astro.push(i)}
            if(i.type==3){ samagri.push(i)}
            if(i.type==4){ decor.push(i)}
        });
        this.setState({
            blogs:                  body.blogs,
            products:               body.products,
            puja:                   puja,
            astro:                  astro,
            samagri:                samagri,
            decor:                  decor,
        })
    }

    activeOffering=(value)=>{ this.setState({ active: value })}

    callbackFunction = (childData) => {
        if(childData){ 
            if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
        }
    }

    render() {
        return (
            <>
                <Header cart={this.state.cart.length}/>
                <section className="banner">
                    <img src="/images/static/banner.jpg" className="web"/>
                    <img src="/images/static/banner-m.jpg" className="mobile"/>
                    <div className="caption">
                        <h1>BOOK YOUR PANDIT JI ONLINE FOR</h1>
                        <p className="hindi">Rudrabhishek Puja</p>
                        <a className="amitBtn btn" href="/product/rudrabhishek-sada-paath">Book Now</a>
                    </div>
                </section>
                <section className="text-heading">
                    <div className="container">
                        <h2 className="hindi">Who we Are</h2>
                    </div>
                </section>
                <div className="container puja py-5">
                    <div className="row">
                        <div className="col-sm-9">
                            <p>Pujarambh is end to your search for qualified pandit/purohits for any puja or hawan and authentic puja samagri for all rituals along with consultation from pandits for shubh muhurat and vastu.</p>
                            <p>We have a large network of pandits which we connects with customers to organize puja or consultations and by utilizing the individual expertise of pandits we are able to provide a better experience for customers participating in the ceremonies.</p>
                            <a className="amitBtn" href="/about-us">Read More</a>
                        </div>
                        <div className="col-sm-3">
                            <img src="/images/static/puja.jpg" className="web"/>
                        </div>
                    </div>
                </div>
                <section className="text-headingList">
                    <div className="container">
                        <div className="tabs">
                            <h2 className="hindi">Our Offering</h2>
                            <ul>
                                <li onClick={()=>this.activeOffering('Service')} className={this.state.active == 'Service' ? 'hindi active' : 'hindi'}>Service</li>
                                <li onClick={()=>this.activeOffering('Product')} className={this.state.active == 'Product' ? 'hindi active' : 'hindi'}>Product</li>
                            </ul>  
                        </div>
                    </div>
                </section>
                <section className="product">
                    {this.state.products ?
                        <div className="container py-5">
                            <div className="row">
                                { this.state.active == 'Service' ? 
                                    <>
                                        {this.state.puja.length? <ServiceSwiper parentCallback ={this.callbackFunction} data={this.state.puja} title="Organize Puja"/> : null}
                                        {this.state.astro.length? <ServiceSwiper parentCallback ={this.callbackFunction} data={this.state.astro} title="Astro Consultation"/> : null}
                                    </>                                    
                                : this.state.active == 'Product' ?
                                    <>
                                        {this.state.samagri.length? <ProductSwiper parentCallback ={this.callbackFunction} data={this.state.samagri} title="Puja Samagri "/> : null}
                                        {this.state.decor.length? <ProductSwiper parentCallback ={this.callbackFunction} data={this.state.decor} title="Home Decor"/> : null}
                                    </>
                                : null }
                            </div>
                        </div>
                    : null}
                </section>
                <section className="testis">
                    <div className="container">
                        <h2 className="hindi">Testimonial</h2>
                        <div className="row">
                            <div className="col-sm-12">
                                <Swiper {...func.params2}>
                                    {func.testis.map((i, index)=>(
                                        <div key={index}>
                                            <ul>
                                                <li className="client">
                                                    <img src={"/images/static/"+i.image}/>
                                                    <h3>{i.name}</h3>
                                                    {/* <p>Web Developer</p> */}
                                                </li>
                                                <li>{i.text}</li>
                                            </ul>
                                        </div>
                                    ))}
                                    </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.blogs?
                <section className="blogList">
                    <div className="container-fluid">
                        <h2 className="hindi">Latest Blogs</h2>
                        <div className="row">
                            <div className="col-sm-1 blank"></div>
                            <div className="col-sm-7 blogData">
                                <h3 className="hindi">Blog Posts</h3>
                                <ul>
                                    {this.state.blogs.slice(0,3).map((i,index)=>(
                                        <li className="mb-5" key={index}>
                                            <a href={"/"+i.url}>
                                                <h4>{i.heading}</h4>
                                                <p className="singleLine">{i.excerpt}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a href="/blog" className="amitBtn mb-5">Read More</a>
                            </div>
                            <div className="col-sm-3 side">
                                {/* <img src="/images/static/side.png"/> */}
                            </div>
                            <img src="/images/static/side.png" className="side"/>
                        </div>
                    </div>
                </section>
                : null}
                {/* <section className="articles text-heading">
                    <ul>
                        <li>Articles</li>
                        <li>Blogs</li>
                    </ul>
                </section>
                {this.state.blogs?
                    <div className="container articleList" >
                        {this.state.blogs.slice(0,2).map((i,index)=>(
                            <div className="row mb-5" key={index}>
                                <div className={index%2 == 0 ? 'col-sm-4 order-1': 'col-sm-4 order-2'}>
                                    <img src={"/images/blog/"+i.coverImg}/>
                                </div>
                                <div className={index%2 == 0 ? 'col-sm-8 blogData order-2': 'col-sm-8 blogData order-1'}>
                                    <h2>{i.heading}</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                                    <a href={"/"+i.url} className="amitBtn">Read More</a>
                                </div>
                            </div>
                        ))}
                    </div>
                : null} */}
                <Footer/>
            </>
        )
    }
}

export default index
