import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
const func = require('../parts/functions')

export class Cart extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            allOK:                  false,
            loading:                true,
            cart:                   [],
            cartId:                 [],
            pujaId:                 [],
            customerName:           '',
            customerEmail:          '',
            customerPhone:          '',
            country:                '',
            state:                  '',
            city:                   '',
            address:                '',
            pin:                    '',
            orderId:                '',
            orderAmount:            '',
            orderCurrency:          'INR',
            orderNote:              "",
            returnUrl:              'https://pujarambh.com/payment-response',
            rPay:                   "https://www.cashfree.com/checkout/post/submit",
            appId:                  '96792f9956bbaeb0c1c7a1d3529769',
            secretKey:              '784bdbd59295dcbb3ef2b4e8c353f225001eedc5',
            notifyUrl:              '',
            signature:              '',
            mode:                   'PROD',
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        const url = window.location.href.split("/").pop()        
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] })}
        var loggedIn            =   false
        var user                =   ''
        if(localStorage.getItem('user')){
            if(JSON.parse(localStorage.getItem('user')).id){
                var loggedIn        =   true
                var user            =   localStorage.getItem('user') || []
                this.setState({
                    customerName:       JSON.parse(localStorage.getItem('user')).name,
                    customerEmail:       JSON.parse(localStorage.getItem('user')).email,
                })
            }
        }
        if(url=='payment-response'){ 
            if(typeof(Storage) !== "undefined" && localStorage.getItem('orderId') && JSON.parse(localStorage.getItem('buyer') )){
                const data ={
                    loggedIn:               loggedIn,
                    user:                   user,
                    orderId :               localStorage.getItem('orderId') || '',
                    buyer:                  localStorage.getItem('buyer') || [],
                    cart:                   localStorage.getItem('cart') || [],
                    address:                localStorage.getItem('address') || ''
                }
                axios.post('/placeOrder', data)
                .catch(err=>func.printError(err))
                .then(res=>{
                    localStorage.setItem('message', res.data.message)
                    if(res.data.success){
                        localStorage.removeItem("buyer");
                        localStorage.removeItem("orderId");
                        localStorage.removeItem("cart");
                        localStorage.removeItem("address");
                        if(!localStorage.getItem('user')){
                            localStorage.setItem('user', JSON.stringify(res.data.user))
                        }
                        window.location.href = '/user/admin'
                    }else{
                        window.location.href = '/cart'
                    }
                })
            }else{
                localStorage.setItem('message', "Your Order was complete")
                window.location.href = '/user/admin'
            }
        }else{
            var ord = JSON.stringify(Math.random()*1000);
            var i = ord.indexOf('.');
            const time = Date.now()
            var ord = 'ORD'+ time + ord.substr(0,i);
            this.setState({ 
                orderId:        ord, 
                loading:        false
            })
            localStorage.setItem('orderId', ord)
        }
    }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.getHash()) }
    reduceCart=()=>{ return this.state.cart.reduce( function(cnt, i){ return cnt + i[0]*i[4]; }, 0) }

    changePhone=(e)=>{
        if(e.target.value.toString().length>10){
            func.callSwal('Only 10 digits allowed')
        }else{
            this.setState({ customerPhone: e.target.value},()=>this.getHash())
        }
    }

    addToCart=(i)=>{
        if( this.state.cart.some( j => j[1] === parseInt(i[1]) )){
            this.state.cart.forEach((o)=>{
                if( o[1] === parseInt(i[1]) ){ 
                    o[0]++
                    func.callSwal(o[3]+" in cart increased to "+o[0])
                }
            })
            const orderAmount = this.reduceCart()
            this.setState({
                cart:                   this.state.cart,
                orderAmount:            orderAmount
            }
                ,()=>{
                    localStorage.setItem('cart', JSON.stringify(this.state.cart)),
                    this.getHash()
                }
            )
        }
    }

    removeFromCart=(i)=>{
        if( this.state.cart.some( j => j[1] === parseInt(i[1]) )){
            this.state.cart.forEach((o, index)=>{
                if( o[1] === parseInt(i[1]) ){
                    if(o[0]>1){ 
                        o[0]--
                        func.callSwal(i[3] + " in cart reduced to "+ o[0])
                    }else{ 
                        this.state.cart.splice(index, 1)
                        func.callSwal(i[3] + " removed from cart ")
                    }
                }
            })
            const orderAmount = this.reduceCart()
            this.setState({
                cart:                   this.state.cart,
                orderAmount:            orderAmount
            }
                ,()=>{
                    localStorage.setItem('cart', JSON.stringify(this.state.cart)),
                    this.getHash()
                }
            )
        }
    }

    getHash=()=>{
        var orderNote = JSON.stringify( [this.state.customerName, this.state.customerEmail, this.state.customerPhone ] )
        var address = JSON.stringify( [this.state.country, this.state.state, this.state.city, this.state.address, this.state.pin, this.state.customerPhone] )
        localStorage.setItem('buyer', orderNote)
        localStorage.setItem('address', address)
        const orderAmount = this.reduceCart()
        this.setState({ 
            orderNote:              orderNote,
            orderAmount:            orderAmount
        })
        if(this.state.country && this.state.state && this.state.city && this.state.address && this.state.pin && this.state.customerPhone && this.state.customerName && this.state.customerEmail && this.state.customerPhone && this.state.orderAmount && this.state.customerName && this.state.customerEmail && this.state.customerPhone.length == 10){
            this.setState({ allOK: true })
        }
        if(this.state.orderAmount && this.state.customerName && this.state.customerEmail && this.state.customerPhone.length==10){
            const hashData={
                appId:                  this.state.appId,
                secretKey:              this.state.secretKey,
                orderId:                this.state.orderId,
                orderCurrency:          this.state.orderCurrency,
                orderAmount:            orderAmount,
                orderNote:              orderNote,
                customerName:           this.state.customerName,
                customerEmail:          this.state.customerEmail,
                customerPhone:          this.state.customerPhone,
                returnUrl:              this.state.returnUrl,
            }
            axios.post('/getHash', hashData)
            .catch(err=>func.printError(err))
            .then(res=>{
                if(res.data.success){ this.setState({ signature:  res.data.signature }) }
            })
        }
    }

    removeItem=(index)=>{
        this.state.cart.splice(index, 1)
        this.setState({cart: this.state.cart}
            ,()=>localStorage.setItem('cart', JSON.stringify(this.state.cart))
            ,()=>this.getHash()
        )
    }

    notOk=()=>{ func.callSwal('Please fill all details to proceed') }

    cartDateChange=(i, e)=>{
        this.state.cart.forEach((o)=>{
            if( o[1] === parseInt(i[1]) ){ o[7] = e.target.value }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    cartPlaceChange=(i, e)=>{
        this.state.cart.forEach((o)=>{
            if( o[1] === parseInt(i[1]) ){ o[8] = e.target.value }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    render() {
        console.log('this.state.cart', this.state.cart)
        if(!this.state.loading){
            return (
                <>
                    <Header cart={this.state.cart.length}/>
                    <div className="container cart my-5">
                        <h1 className="heading">Cart</h1>
                        {this.state.cart.length?
                            <>
                                <div className="row">
                                    <div className="col-sm-9 cartList">
                                        { this.state.cart.map((i, index)=>{ return (
                                            <div className="cartLoop" key={index}>
                                                {i.type}
                                                <a href={"/product/"+i[5]}><img src={"/images/product/"+i[2]} className="previewImg"/></a>
                                                <div>
                                                    <div className="changeQty flex-sb">
                                                        <a href={"/product/"+i[6]}><p>{i[3]}</p></a>
                                                        <p className="price">{i[0]} X &#8377;{i[4]}</p>
                                                        <div>
                                                            <label>Quantity</label>
                                                            <ul>
                                                                <li onClick={()=>this.removeFromCart(i)}>-</li>
                                                                <li>{i[0]}</li>
                                                                <li onClick={()=>this.addToCart(i)}>+</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <img className="remove" src="/images/icons/wrong-red.svg" onClick={()=>this.removeItem(index)}/>
                                                </div>
                                            </div>
                                        )})}
                                        { this.state.cart.filter(i=>i[6]==1).map((i, index)=>{ return (
                                            <div key={index} className="row mb-3">
                                                <div className="col-sm-12">
                                                    <h3>Puja Details for {i[3]}</h3>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label>Desire date * (Please book 48 Hours in Advance)</label>
                                                    <input className="form-control" type="date" placeholder="Desire date of Puja" value={i[7] || '' } onChange={(e)=>this.cartDateChange(i, e)} name="date"/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label>Place *</label>
                                                    <input className="form-control" type="text" placeholder="Place of Puja" value={i[8] || ''} onChange={(e)=>this.cartPlaceChange(i, e)} name="place"/>
                                                </div>
                                            </div>
                                        )})}


                                    </div>
                                    <div className="col-sm-3 cartSummary">
                                        <h3>YOUR CART</h3>
                                            <ul>
                                                { this.state.cart.map((i, index)=>{ return (
                                                    <li key={index}>
                                                        <div>
                                                            <p>{i[3]}</p>
                                                            <p><span>{i[0]} Item</span></p>
                                                        </div>
                                                        <p>&#8377;{i[0]*i[4] ? i[0]*i[4] : 0 }</p>
                                                    </li>
                                                )})}
                                            </ul>
                                        <hr/>
                                        <div className="total">
                                            <h3>Total</h3>
                                            <p>&#8377;{this.reduceCart()}</p>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="heading">Shipping Address</h2>
                                <div className="row">
                                    <div className="col-sm-4 mb-3">
                                        <label>Country *</label>
                                        <input className="form-control" type="text" name="country" required placeholder="Country" value={this.state.country} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4 mb-3">
                                        <label>State *</label>
                                        <input className="form-control" type="text" name="state" required placeholder="State" value={this.state.state} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4 mb-3">
                                        <label>City *</label>
                                        <input className="form-control" type="text" name="city" required placeholder="City" value={this.state.city} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-9">
                                        <label>Address *</label>
                                        <input className="form-control" type="text" name="address" required placeholder="Shipping Address" value={this.state.address} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-3">
                                        <label>PIN Code *</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="pin" required placeholder="Postal PIN" value={this.state.pin} onChange={this.onChange}/>
                                    </div>
                                </div>

                                <form className="my-5" encType="multipart/form-data" method="post" action={this.state.rPay}>
                                    <input type="hidden" name="appId" value={this.state.appId}/>
                                    <input type="hidden" name="orderId" value={this.state.orderId}/>
                                    <input type="hidden" name="orderAmount" value={this.state.orderAmount}/>
                                    <input type="hidden" name="orderCurrency" value={this.state.orderCurrency}/>
                                    <input type="hidden" name="orderNote" value={this.state.orderNote}/>
                                    <h2 className="heading">Your Details</h2>
                                    <div className="row shipping">
                                        <div className="col-sm-5">
                                            <label>Name *</label>
                                            <input className="form-control" type="text" name="customerName" required placeholder="Name Please" value={this.state.customerName} onChange={this.onChange}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Email *</label>
                                            <input className="form-control" type="email" name="customerEmail" required placeholder="Email" value={this.state.customerEmail} onChange={this.onChange}/> 
                                        </div>
                                        <div className="col-sm-3 phone">
                                            <label>Phone *</label>
                                            <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="customerPhone" required placeholder="Phone" value={this.state.customerPhone} onChange={this.changePhone}/>
                                        </div>
                                        <input type="hidden" name="returnUrl" value={this.state.returnUrl}/>
                                        <input type="hidden" name="signature" value={this.state.signature}/>
                                        <div className="col-sm-12 w-100 mt-5">
                                            <h3>Final Invoice : &#8377;{this.reduceCart()}</h3>
                                                <div className="my-div"><button className="amitBtn" disabled={this.state.allOK? false : true}>Pay now</button></div>
                                                <p className="text-center">{ !this.state.allOK ? "Please provide all the details to proceed further" : "Please proceed to payment" }</p>
                                        </div>
                                    </div>
                                </form>
                            </>
                            :
                            <div className="row my-5">
                                <div className="col-sm-12">
                                    <p className='text-center'>You are travelling with an empty cart my friend. Go back to the <a href="/shop" className="amitBtn">shop page</a> and buy something for your happy life</p>
                                </div>
                            </div>
                        }
                    </div>
                    <Footer/>
                </>
            )
        }else{
            return (
                <div className="response">
                    <img src="/images/logo.svg" className="logo"/>
                    <h3>Please wait and do not refresh</h3>
                </div>
            )
        }
    }
}

export default Cart
