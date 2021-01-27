import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Swiper from 'react-id-swiper'
const func = require('../parts/functions')

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs:                  this.props.blogs,
            products:               this.props.products,
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
        this.setState({
            blogs:                  body.blogs,
            products:               body.products,
        })
    }

    addToCart=(i)=>{
        var item = [1, i.id, JSON.parse(i.images)[0], i.name, i.price, i.url, i.type ]
        if( this.state.cart.some( j => j[1] === parseInt(i.id) )){
            this.state.cart.forEach((o)=>{
                if( o[1] === parseInt(i.id) ){ 
                    o[0]++
                    func.callSwal(o[3]+" in cart increased to "+o[0])
                }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
        }else{
            this.setState({ cart: [...this.state.cart, item] },()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
            func.callSwal(i.name + " added to cart ")
        }
    }

    removeFromCart=(i)=>{
        if( this.state.cart.some( j => j[1] === parseInt(i.id) )){
            this.state.cart.forEach((o, index)=>{
                if( o[1] === parseInt(i.id) ){
                    if(o[0]>1){ 
                        o[0]--
                        func.callSwal(i.name + " in cart reduced to "+ o[0])
                    }else{ 
                        this.state.cart.splice(index, 1)
                        func.callSwal(i.name + " removed from cart ")
                    }
                }
            })
        }
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    activeOffering=(value)=>{ this.setState({ active: value })}

    render() {
        const params = {
            slidesPerView: 1,
            spaceBetween: 10,
            // loop: true,
            // autoplay: { delay: 3000 },
            breakpoints: {
                440: { slidesPerView: 2, spaceBetween: 20, },
                768: { slidesPerView: 3, spaceBetween: 20, },
                1400: { slidesPerView: 6, spaceBetween: 30, },
            },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        }
        const params2 = {
            slidesPerView: 1,
            spaceBetween: 20,
            // loop: true,
            // autoplay: { delay: 3000 },
            breakpoints: {
                767: { slidesPerView: 2 },
                1400: { slidesPerView: 2, spaceBetween: 10, },
            },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        }
        return (
            <>
                <Header cart={this.state.cart.length}/>
                <section className="banner">
                    <img src="/images/static/banner.jpg"/>
                    <div className="caption">
                        <h1>Book Your Pandit Online For</h1>
                        <p className="hindi">Ganesh Puja</p>
                        <button className="amitBtn btn">Book Now</button>
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
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <button className="amitBtn">Read More</button>
                        </div>
                        <div className="col-sm-3">
                            <img src="/images/static/puja.jpg"/>
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
                                    { this.state.active == 'Product' ?
                                        <div className="col-sm-12">
                                            <Swiper {...params}> 
                                                {this.state.products.map((i,index)=>( 
                                                    <div key={index}>
                                                        <div className="imgBox">
                                                            <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                            { this.state.cart.some(x => x[1] === i.id) ? 
                                                                <div className="cartBtnGroup flex-sb">
                                                                    <div className="plusMinus">
                                                                        <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)} style={{marginRight: '10px'}}/>
                                                                        <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                                    </div>
                                                                </div>
                                                            : null }
                                                            { this.state.cart.some(x => x[1] === i.id) ?
                                                                <div className="itemAdded">
                                                                    { this.state.cart.filter(o => o[1] === i.id).map(( o, index) => { return ( 
                                                                        <p key={index}>{o[0]} X &#8377;{o[4]} = &#8377;{o[0]*o[4]}</p> 
                                                                    )})}
                                                                </div>
                                                            : null}
                                                        </div>
                                                        {i.tagline? <p className="usage">{i.tagline}</p> : null}
                                                        <div className="productDetail">
                                                            <h3>{i.name}</h3>
                                                            <p>Price: Rs {i.price}</p>
                                                            <div className="button-wrap">
                                                                <a href={"/product/"+i.url} className="button-default button-slanted button-slanted--left">
                                                                    <span className="button-slanted-content" style={{color: "#000"}}>View Detail</span>
                                                                </a>
                                                                <div className="button-default button-slanted button-slanted--right" onClick={()=>this.addToCart(i)}>
                                                                    <span className="button-slanted-content">Add To cart</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))} 
                                            </Swiper>
                                        </div>
                                    : this.state.active == 'Service' ? 
                                        <>
                                            <div className="col-sm-12 mb-5">
                                                <h4>Puja</h4>
                                                <Swiper {...params}> 
                                                    {this.state.products.map((i,index)=>( 
                                                        <div key={index}>
                                                            <div className="imgBox">
                                                                <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                                { this.state.cart.some(x => x[1] === i.id) ? 
                                                                    <div className="cartBtnGroup flex-sb">
                                                                        <div className="plusMinus">
                                                                            <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)} style={{marginRight: '10px'}}/>
                                                                            <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                                        </div>
                                                                    </div>
                                                                : null }
                                                                { this.state.cart.some(x => x[1] === i.id) ?
                                                                    <div className="itemAdded">
                                                                        { this.state.cart.filter(o => o[1] === i.id).map(( o, index) => { return ( 
                                                                            <p key={index}>{o[0]} X &#8377;{o[4]} = &#8377;{o[0]*o[4]}</p> 
                                                                        )})}
                                                                    </div>
                                                                : null}
                                                            </div>
                                                            {i.tagline? <p className="usage">{i.tagline}</p> : null}
                                                            <div className="productDetail">
                                                                <h3>{i.name}</h3>
                                                                <p>Price: Rs {i.price}</p>
                                                                <div className="button-wrap">
                                                                    <a href={"/product/"+i.url} className="button-default button-slanted button-slanted--left">
                                                                        <span className="button-slanted-content" style={{color: "#000"}}>View Detail</span>
                                                                    </a>
                                                                    <div className="button-default button-slanted button-slanted--right" onClick={()=>this.addToCart(i)}>
                                                                        <span className="button-slanted-content">Add To cart</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))} 
                                                </Swiper>
                                            </div>
                                            <div className="col-sm-12">
                                                <h4>Consultation</h4>
                                                <Swiper {...params}> 
                                                    {this.state.products.map((i,index)=>( 
                                                        <div key={index}>
                                                            <div className="imgBox">
                                                                <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                                { this.state.cart.some(x => x[1] === i.id) ? 
                                                                    <div className="cartBtnGroup flex-sb">
                                                                        <div className="plusMinus">
                                                                            <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)} style={{marginRight: '10px'}}/>
                                                                            <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                                        </div>
                                                                    </div>
                                                                : null }
                                                                { this.state.cart.some(x => x[1] === i.id) ?
                                                                    <div className="itemAdded">
                                                                        { this.state.cart.filter(o => o[1] === i.id).map(( o, index) => { return ( 
                                                                            <p key={index}>{o[0]} X &#8377;{o[4]} = &#8377;{o[0]*o[4]}</p> 
                                                                        )})}
                                                                    </div>
                                                                : null}
                                                            </div>
                                                            {i.tagline? <p className="usage">{i.tagline}</p> : null}
                                                            <div className="productDetail">
                                                                <h3>{i.name}</h3>
                                                                <p>Price: Rs {i.price}</p>
                                                                <div className="button-wrap">
                                                                    <a href={"/product/"+i.url} className="button-default button-slanted button-slanted--left">
                                                                        <span className="button-slanted-content" style={{color: "#000"}}>View Detail</span>
                                                                    </a>
                                                                    <div className="button-default button-slanted button-slanted--right" onClick={()=>this.addToCart(i)}>
                                                                        <span className="button-slanted-content">Add To cart</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))} 
                                                </Swiper>
                                            </div>
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
                                <Swiper {...params2}>
                                    <div>
                                        <ul>
                                            <li className="client">
                                                <img src="/images/static/amit.jpg"/>
                                                <h3>Amit Khare</h3>
                                                <p>Web Developer</p>
                                            </li>
                                            <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li className="client">
                                                <img src="/images/static/amit.jpg"/>
                                                <h3>Amit Khare</h3>
                                                <p>Web Developer</p>
                                            </li>
                                            <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li className="client">
                                                <img src="/images/static/amit.jpg"/>
                                                <h3>Amit Khare</h3>
                                                <p>Web Developer</p>
                                            </li>
                                            <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></li>
                                        </ul>
                                    </div>
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
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
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
