import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Swiper from 'react-id-swiper'

export class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count:[
                {'id': 1, 'url': 'url', 'image': 1 },
                {'id': 2, 'url': 'url', 'image': 2 },
                {'id': 3, 'url': 'url', 'image': 3 },
                {'id': 4, 'url': 'url', 'image': 4 },
                {'id': 5, 'url': 'url', 'image': 5 },
                {'id': 6, 'url': 'url', 'image': 6 },
                {'id': 7, 'url': 'url', 'image': 7 },
                {'id': 8, 'url': 'url', 'image': 8 },
                {'id': 9, 'url': 'url', 'image': 9 },
                {'id': 10, 'url': 'url', 'image': 10 }
            ]
        }
    }
    
    render() {
        const params = {
            slidesPerView: 6,
            spaceBetween: 10,
            // loop: true,
            // autoplay: { delay: 3000 },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20, },
                768: { slidesPerView: 3, spaceBetween: 20, },
                1400: { slidesPerView: 6, spaceBetween: 30, },
            },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        }
        const params2 = {
            slidesPerView: 3,
            spaceBetween: 20,
            // loop: true,
            // autoplay: { delay: 3000 },
            breakpoints: {
                768: { slidesPerView: 1 },
                1400: { slidesPerView: 2, spaceBetween: 50, },
            },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        }
        return (
            <>
                <Header/>
                <section className="banner">
                    <img src="/images/static/banner.jpg"/>
                    <div className="caption">
                        <h1>Book Your Pandit Online For</h1>
                        <p>Ganesh Puja</p>
                        <button className="amitBtn btn">Book Now</button>
                    </div>
                </section>
                <section className="text-heading">
                    <h2>Who we Are</h2>
                </section>
                <div className="container puja">
                    <div className="row">
                        <div className="col-sm-7">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <button className="amitBtn">Read More</button>
                        </div>
                        <div className="col-sm-5">
                            <img src="/images/static/puja.jpg"/>
                        </div>
                    </div>
                </div>
                <section className="text-heading">
                    <h2>Our Offering</h2>
                    <ul>
                        <li>Order Samagari</li>
                        <li>Puja Samagari</li>
                    </ul>
                </section>
                <section className="product">
                    {/* {this.state.category && this.state.category.length? */}
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Swiper {...params}>
                                    {/* {this.state.category.map((i,index)=>(  */}
                                    {this.state.count.map((i,index)=>( 
                                        <div key={index}>
                                            {/* <a href={i.url}> */}
                                                <img src={"images/product/product-"+i.image+".jpg"} alt=""/>
                                                <p className="usage">Ideal for all Puja like</p>
                                                <div className="productDetail">
                                                    <h3>Puja Kit</h3>
                                                    <p>Price: Rs 500</p>
                                                    <ul>
                                                        <li><a href="#">View Detail</a></li>
                                                        <li><a href="#">Add To cart</a></li>
                                                    </ul>
                                                </div>
                                            {/* </a> */}
                                        </div>
                                    ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    {/* : null} */}
                </section>
                <section className="text-heading">
                    <h2>Make your Own Kit</h2>
                </section>
                <section className="product">
                    {/* {this.state.category && this.state.category.length? */}
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Swiper {...params}>
                                    {/* {this.state.category.map((i,index)=>(  */}
                                    {this.state.count.map((i,index)=>( 
                                        <div key={index}>
                                            {/* <a href={i.url}> */}
                                                <img src={"images/product/product-"+i.image+".jpg"} alt=""/>
                                                <p className="usage">Ideal for all Puja like</p>
                                                <div className="productDetail">
                                                    <h3>Puja Kit</h3>
                                                    <p>Price: Rs 500</p>
                                                    <ul>
                                                        <li><a href="#">View Detail</a></li>
                                                        <li><a href="#">Add To cart</a></li>
                                                    </ul>
                                                </div>
                                            {/* </a> */}
                                        </div>
                                    ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    {/* : null} */}
                </section>
                <section className="testis">
                    <div className="container">
                        <h2>Testimonial</h2>
                        <div className="row">
                            <div className="col-sm-12">
                                <Swiper {...params2}>
                                {this.state.count.map((i,index)=>( 
                                    <div key={index}>
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
                                    </div>
                                ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="blogList">
                    <div className="container">
                        <h2>Latest Blogs</h2>
                        <div className="row">
                            <div className="col-sm-8">
                                <h3>Blogs</h3>
                                <ul>
                                    <li>
                                        <h4>Blog title</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                                        <p className="date">16 jan 2021</p>
                                    </li>
                                    <li>
                                        <h4>Blog title</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                                        <p className="date">16 jan 2021</p>
                                    </li>
                                    <li>
                                        <h4>Blog title</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                                        <p className="date">16 jan 2021</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-4">

                            </div>
                        </div>
                    </div>
                </section>
                <section className="articles text-heading">
                    <ul>
                        <li>Articles</li>
                        <li>Blogs</li>
                    </ul>
                </section>
                <div className="container articleList">
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="/images/blog/pic-1.jpg"/>
                        </div>
                        <div className="col-sm-8 blogData">
                            <h2>Blog Title</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                            <button className="amitBtn">Read More</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default index
