import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class ProdCatItems extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            products:                   this.props.products,
            name:                       this.props.name,
            cart:                       [],
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
        const url = window.location.href.split("/").pop()
        this.callApi(url)
    }

    callApi = async (url) => {
        const response = await fetch( '/fetchProdCatItems/'+url ); 
        const body = await response.json()
        this.setState({
            products :              body.data,
            name:                   body.name
        })
    }

    addToCart=(i)=>{
        if(i.sale){ var price = i.sale }else { var price = i.price }
        var item = [1, i.id, JSON.parse(i.images)[0], i.name, price, i.url, i.type ]
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


    render() {
        return (
            <>
                <Header/>
                {this.state.products?           
                    <div className="container page py-5">
                        {this.state.name ? 
                            <>
                                <h1 className="heading my-3"> Products of {this.state.name} category</h1>
                                {this.state.products.length?
                                    <p className="text-center">Below are some fo the product categories you might like to check.</p>
                                    :
                                    <>
                                        <p className="text-center">We are yet to add products for this category. Do check out our shop directly</p>
                                        <div className="my-div"><a class="amitBtn" href="/shop">Shop</a></div>
                                    </>

                                }
                            </>
                        : null }
                        <div className="row my-5">
                            {this.state.products.map((i,index)=>(
                                <div className="col-sm-3 mb-3" key={index}>
                                    <div style={{'overflow':'hidden'}}>
                                        <div className="imgBox">
                                            <a href={"/product/"+i.url}><img src={"/images/product/"+JSON.parse(i.images)[0]} alt={JSON.parse(i.images)[0].replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')}/></a>
                                        </div>
                                        <div className="productDetail">
                                            <h3>{i.name}</h3>
                                            <p>
                                                <span className={i.sale ? "price strike" : "price"}>
                                                    <span className="rs">&#8377; </span>{i.price}
                                                </span>
                                                {i.sale ? <span className="price"><span className="rs">&#8377; </span>{i.sale}</span> : null }
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
                                </div>
                            ))}
                        </div>
                    </div>
                : null}
                <Footer/>
            </>
        )
    }
}

export default ProdCatItems
