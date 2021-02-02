import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
const func = require('../parts/functions')

export class Cart extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            paymentInProcess:       false,
            cart:                   [],
            cost:                   0,
            coupon:                 '',
            // customerName:        '',
            // customerEmail:       '',
            // customerPhone:       '',
            // country:                '',
            // state:                  '',
            // city:                   '',
            // address:                '',
            // pin:                    '',
            customerName:            'Amit',
            customerEmail:          'amit.khare588@gmail.com',
            customerPhone:          '123456789',
            country:                'India',
            state:                  'Haryana',
            city:                   'Faridabad',
            address:                '1172',
            pin:                    '122002',
            returnUrl:              'http://localhost:3000/payment-response',
            // returnUrl:              'https://webhook.site/91bea022-80bf-4de9-8f25-0237a4fcb7d2',
            orderId:                '',
            orderAmount:            100,
            orderCurrency:          'INR',
            orderNote:              "",
            signature:              "fcd0JtCkEAb4ymXe/JD2f7Ie+RjfOuuh+gtq6QDn++s=",
            rPay:                   "https://test.cashfree.com/billpay/checkout/post/submit",
            appId:                  '51409786e7f06e6c43c7d7c3d90415',
            secretKey:              '414a13ae0b6afb753ca031a73e35129a6f35ea57',
            mode:                   'TEST'
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
                console.log('Cheking User')
                var loggedIn        =   true
                var user            =   localStorage.getItem('user') || []
            }
        }
        if(url=='payment-response'){ 
            console.log("1")
            if(typeof(Storage) !== "undefined" && localStorage.getItem('orderId') && JSON.parse(localStorage.getItem('buyer'))){
                const data ={
                    loggedIn:               loggedIn,
                    user:                   user,
                    orderId :               localStorage.getItem('orderId') || '',
                    buyer:                  localStorage.getItem('buyer') || [],
                    cart:                   localStorage.getItem('cart') || []
                }
                axios.post('/placeOrder', data)
                .catch(err=>console.log('err', err))
                .then(res=>{
                    console.log('res.data', res.data)
                    if(res.data.success){
                        console.log("all Set")
                        // localStorage.setItem('message', res.data.message)
                        localStorage.removeItem("buyer");
                        localStorage.removeItem("orderId");
                        localStorage.removeItem("cart");
                        console.log("all Clear")
                        if(res.data.message == 'Created'){
                            console.log("1")
                            localStorage.setItem('message', "11111111111111")
                            localStorage.setItem('user', JSON.stringify(res.data.user))
                            window.location.href = '/my-orders'
                        }else{
                            console.log("2")
                            localStorage.setItem('message', "22222222222222")
                            localStorage.setItem('user', JSON.stringify(res.data.user))
                            window.location.href = '/my-orders'
                        }
                    }
                })
            }else{
                localStorage.setItem('message', "Your Order was complete")
                window.location.href = '/my-orders'
            }
        }else{
            console.log("2")
            var ord = JSON.stringify(Math.random()*1000);
            var i = ord.indexOf('.');
            const time = Date.now()
            var ord = 'ORD-'+ time + ord.substr(0,i);
            this.setState({ orderId: ord })
            localStorage.setItem('orderId', ord)
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.getHash()) }
    reduceCart=()=>{ return this.state.cart.reduce( function(cnt, i){ return cnt + i[0]*i[4]; }, 0) }

    addToCart=(i)=>{
        if( this.state.cart.some( j => j[1] === parseInt(i[1]) )){
            this.state.cart.forEach((o)=>{
                if( o[1] === parseInt(i[1]) ){ 
                    o[0]++
                    func.callSwal(o[3]+" in cart increased to "+o[0])
                }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
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
        }
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    changeUnit=(i, e)=>{
        this.state.cart.forEach(o =>{
            if( o[1] === parseInt(i[1]) ){
                o[0]= parseInt( e.target.value )
            }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    getHash=()=>{
        // const cart = []
        // this.state.cart.map(i=>( cart.push( [i[0], i[1]] ) ))
        var orderNote = JSON.stringify( [this.state.customerName, this.state.customerEmail, this.state.customerPhone ] )
        localStorage.setItem('buyer', orderNote)
        this.setState({ orderNote : orderNote })
        if(this.state.orderAmount && this.state.customerName && this.state.customerEmail && this.state.customerPhone){
            const hashData={
                appId:                  this.state.appId,
                secretKey:              this.state.secretKey,
                orderId:                this.state.orderId,
                orderAmount:            this.state.orderAmount,
                orderCurrency:          this.state.orderCurrency,
                orderNote:              orderNote,
                customerName:           this.state.customerName,
                customerEmail:          this.state.customerEmail,
                customerPhone:          this.state.customerPhone,
                returnUrl:              this.state.returnUrl,
                notifyUrl:              '',
            }
            axios.post('/getHash', hashData)
            .catch(err=>console.log('err', err))
            .then(res=>{
                console.log('res.data', res.data)
                if(res.data.success){
                    this.setState({ signature: res.data.signature})
                }
            })
        }
    }

    removeItem=(index)=>{
        this.state.cart.splice(index, 1)
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    render() {
        console.log('this.state', this.state)
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
                                        <a href={"/product/"+i[6]}><img src={"/images/product/"+i[2]} className="previewImg"/></a>
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
                            <form className="my-5" encType="multipart/form-data" method="post" action={this.state.rPay}>
                                <input type="hidden" name="appId" value={this.state.appId}/>
                                <input type="hidden" name="orderId" value={this.state.orderId}/>
                                <input type="hidden" name="orderAmount" value={this.state.orderAmount}/>
                                <input type="hidden" name="orderCurrency" value={this.state.orderCurrency}/>
                                <input type="hidden" name="orderNote" value={this.state.orderNote}/>
                                <h2 className="heading">Your Details</h2>
                                <div className="row shipping">
                                    {/* <div className="col-sm-12">
                                        <label>Message</label>
                                        <textarea type="text" name="orderNote" required className="form-control" placeholder="Message" value={this.state.orderNote} onChange={this.onChange}></textarea>
                                    </div> */}
                                    <div className="col-sm-5">
                                        <label>Name</label>
                                        <input className="form-control" type="text" name="customerName" required placeholder="Name Please" value={this.state.customerName} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Email</label>
                                        <input className="form-control" type="email" name="customerEmail" required placeholder="Email" value={this.state.customerEmail} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-3 phone">
                                        <label>Phone</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="customerPhone" required placeholder="Phone" value={this.state.customerPhone} onChange={this.onChange}/>
                                    </div>
                                    {/* <div className="col-sm-4">
                                        <label>Country</label>
                                        <input className="form-control" type="text" name="country" required placeholder="Country" value={this.state.country} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>State</label>
                                        <input className="form-control" type="text" name="state" required placeholder="State" value={this.state.state} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>City</label>
                                        <input className="form-control" type="text" name="city" required placeholder="City" value={this.state.city} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-9">
                                        <label>Address</label>
                                        <input className="form-control" type="text" name="address" required placeholder="Shipping Address" value={this.state.address} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-3">
                                        <label>PIN Code</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="pin" required placeholder="Postal PIN" value={this.state.pin} onChange={this.onChange}/>
                                    </div> */}
                                    <input type="hidden" name="returnUrl" value={this.state.returnUrl}/>
                                    <input type="hidden" name="notifyUrl" value={this.state.notifyUrl}/>
                                    <input type="hidden" name="signature" value={this.state.signature}/>
                                    <div className="col-sm-12 w-100 mt-5">
                                        <h3>Final Invoice : &#8377;{this.reduceCart()}</h3>
                                            {/* <span>Cost <strong>&#8377;{this.reduceCart()}</strong> </span>
                                            {this.state.paymentInProcess ?
                                                <div className="loading"><img src="/images/icons/loading.gif"/></div>
                                            :
                                                
                                            } */}
                                            <div className="my-div"><button className="amitBtn">Pay now</button></div>
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
    }
}

export default Cart
