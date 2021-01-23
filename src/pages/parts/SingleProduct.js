import React, { Component } from 'react'
const func = require('../parts/functions')

export class SingleProduct extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:                   [],
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
    }

    addToCart=(i)=>{
        // console.log('i', i)
        var item = [1, i.id, JSON.parse(i.images)[0], i.name, i.price, i.url ]
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
    
    render() {
        console.log('this.state.cart', this.state.cart)
        return (
            <>
                { this.props.product ?
                    <>
                        <div className="imgBox">
                            <a href={"/product/"+this.props.product.url}><img src={"/images/product/"+JSON.parse(this.props.product.images)[0]} alt=""/></a>
                            { this.state.cart.some(x => x[1] === this.props.product.id) ? 
                                <div className="cartBtnGroup flex-sb">
                                    <div className="plusMinus">
                                        <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(this.props.product)} style={{marginRight: '10px'}}/>
                                        <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(this.props.product)}/>
                                    </div>
                                </div>
                            : null }
                            { this.state.cart.some(x => x[1] === this.props.product.id) ?
                                <div className="itemAdded">
                                    { this.state.cart.filter(o => o[1] === this.props.product.id).map(( o, index) => { return ( 
                                        <p key={index}>{o[0]} X &#8377;{o[4]} = &#8377;{o[0]*o[4]}</p> 
                                    )})}
                                </div>
                            : null}
                        </div>
                        {/* <p className="usage">Ideal for all Puja like</p> */}
                        <div className="productDetail">
                            <h3>{this.props.product.name}</h3>
                            <p>Price: Rs {this.props.product.price}</p>
                            <div className="button-wrap">
                                <a href={"/product/"+this.props.product.url} className="button-default button-slanted button-slanted--left">
                                    <span className="button-slanted-content" style={{color: "#000"}}>View Detail</span>
                                </a>
                                <div className="button-default button-slanted button-slanted--right" onClick={()=>this.addToCart(this.props.product)}>
                                    <span className="button-slanted-content">Add To cart</span>
                                </div>
                            </div>
                        </div>
                    </>
                : null }
            </>
        )
    }
}

export default SingleProduct