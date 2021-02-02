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
        return (
            <>
                <Header cart={this.state.cart.length}/>
                <section className="banner">
                    <img src="/images/static/banner.jpg" className="web"/>
                    <img src="/images/static/banner-m.jpg" className="mobile"/>
                    <div className="caption">
                        <h1>BOOK YOUR PANDIT ONLINE FOR</h1>
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
                            <p>Pujarambh is end to your search for qualified pundit/purohits for any puja or hawan and authentic puja samagri for all rituals along with consultation from pundits for shubh muhurat and vastu.</p>
                            <p>We have a large network of pundits which we connects with customers to organize puja or consultations and by utilizing the individual expertise of pundits we are able to provide a better experience for customers participating in the ceremonies.</p>
                            <button className="amitBtn">Read More</button>
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
                                    { this.state.active == 'Product' ?
                                        <>
                                        <div className="col-sm-12 mb-5">
                                            <h4 className="hindi">Puja Samagri</h4>
                                            <Swiper {...func.params}> 
                                                {this.state.products.filter(i=>i.type == 3).map((i,index)=>(
                                                    <div key={index}>
                                                        <div className="imgBox">
                                                            <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                            {/* { this.state.cart.some(x => x[1] === i.id) ? 
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
                                                            : null} */}
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
                                            <h4 className="hindi">Home Decor</h4>
                                            <Swiper {...func.params}> 
                                            {this.state.products.filter(i=>i.type == 4).map((i,index)=>( 
                                                    <div key={index}>
                                                        <div className="imgBox">
                                                            <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                            {/* { this.state.cart.some(x => x[1] === i.id) ? 
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
                                                            : null} */}
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
                                    : this.state.active == 'Service' ? 
                                        <>
                                            <div className="col-sm-12 mb-5">
                                                <h4 className="hindi">Organize Puja</h4>
                                                <Swiper {...func.params}> 
                                                    {this.state.products.filter(i=>i.type == 1).map((i,index)=>( 
                                                        <div key={index}>
                                                            <div className="imgBox">
                                                                <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                                {/* { this.state.cart.some(x => x[1] === i.id) ? 
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
                                                                : null} */}
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
                                                <h4 className="hindi">Astro Consultation</h4>
                                                <Swiper {...func.params}> 
                                                    {this.state.products.filter(i=>i.type == 2).map((i,index)=>( 
                                                        <div key={index}>
                                                            <div className="imgBox">
                                                                <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                                                                {/* { this.state.cart.some(x => x[1] === i.id) ? 
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
                                                                : null} */}
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
