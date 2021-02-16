import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
const func = require('../parts/functions')

export class ProductSwiper extends Component {    
    addToCart=async(i)=>{
        const xx = await func.addToCart(i)
        if(xx){ this.sendDataToParent() }
    }
    sendDataToParent=()=>{ this.props.parentCallback (true); }

    render() {
        return (
            <div className="col-sm-12 mb-5">
                <h4 className="hindi">{this.props.title}</h4>
                <Swiper {...func.params}> 
                    {this.props.data.map((i,index)=>( 
                        <div key={index}>
                            <div className="imgBox">
                                <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt=""/></a>
                            </div>
                            {i.tagline? <p className="usage">{i.tagline}</p> : null}
                            <div className="productDetail">
                                <h3>{i.name}</h3>
                                {/* <p>Price: Rs {i.price}</p> */}
                                <p>
                                    <span className={i.sale ? "price strike" : "price"}>
                                        <span className="rs">&#8377; </span>{i.price} /-
                                    </span>
                                    {i.sale ? <span className="price"><span className="rs">&#8377; </span>{i.sale} /-</span> : null }
                                </p>
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
        )
    }
}

export default ProductSwiper
