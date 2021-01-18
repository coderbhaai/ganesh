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
            name:                   '',
            email:                  '',
            phone:                  '',
            country:                '',
            state:                  '',
            city:                   '',
            address:                '',
            pin:                    '',
            message:                '',
            // name:                   'Amit',
            // email:                  'test@test.com',
            // phone:                  '123456789',
            // country:                'India',
            // state:                  'Haryana',
            // city:                   'Faridabad',
            // address:                '1172',
            // pin:                    '122002',
            // message:                'Hi',
        }
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    reduceCart=()=>{ return this.state.cart.reduce( function(cnt, i){ return cnt + i[0]*i[4]; }, 0) }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) } 
    }

    changeUnit=(i, e)=>{
        this.state.cart.forEach(o =>{
            if( o[1] === parseInt(i[1]) ){
                o[0]= parseInt( e.target.value )
            }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    payment=(e)=>{
        e.preventDefault()
        this.setState({ paymentInProcess: true })
        const cost = this.reduceCart();
        const data={
            address:                JSON.stringify( [this.state.name, this.state.email, this.state.phone, this.state.message, this.state.country, this.state.state, this.state.city, this.state.address, this.state.pin] ),
            cart:                   JSON.stringify( this.state.cart ),
            invoice:                cost,
            email :                 this.state.email,
            name:                   this.state.name
        } 
        axios.post('/admin/placeOrder', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){ 
                    this.setState({ cart: [] },()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
                    localStorage.setItem('message', res.data.message)
                    this.setState({ paymentInProcess: false })
                    window.location.href = '/thank-you'
                }
            })
    }

    removeItem=(index)=>{
        this.state.cart.splice(index, 1)
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }
        
    render() {
        return (
            <>
                <Header cart={this.state.cart.length}/>
                <div className="container cart my-5">
                    <h1 className="heading">Cart</h1>
                    {this.state.cart.length?
                        <>
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <td>Sl no.</td>
                                                <td>Item</td>
                                                <td>Quantity</td>
                                                <td>Rate</td>
                                                <td>Cost</td>
                                                <td>Remove</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.cart.map((i, index)=>{ return (
                                                <tr key={index}>
                                                    <td className="text-center">{index+1}</td>
                                                    <td className="cartImg"><a href={"/product/"+i[6]}><img src={"/images/product/"+i[2]} className="previewImg"/>{i[3]}</a></td>
                                                    <td className="mAuto">
                                                        <input type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="1" className="form-control unit" required value={i[0]} onChange={(e)=>this.changeUnit( i, e)} style={{maxWidth:'90px', margin:'0 auto'}}/>
                                                    </td>
                                                    <td className="text-center">&#8377;{i[4]}</td>
                                                    <td className="text-center">&#8377;{i[0]*i[4] ? i[0]*i[4] : 0 }</td>
                                                    <td className="text-center"><img className="remove" src="/images/icons/wrong-red.svg" onClick={()=>this.removeItem(index)}/></td>
                                                </tr>
                                            )})}
                                            { this.state.cart.length>0 ?
                                            <tr>
                                                <td className="text-center" colSpan="4"><strong>Total</strong></td>
                                                <td className="text-center"><strong>&#8377;{this.reduceCart()}</strong></td>
                                                <td></td>
                                            </tr>
                                            : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <form encType="multipart/form-data" onSubmit={this.payment} className="my-5">
                                <h2 className="heading">Shipping Address</h2>
                                <div className="row shipping">
                                    <div className="col-sm-5">
                                        <label>Name</label>
                                        <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Email</label>
                                        <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Phone</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="phone" required placeholder="Phone Please" value={this.state.phone} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
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
                                        <input className="form-control" type="text" name="address" required placeholder="Shipping Addrress Please" value={this.state.address} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-3">
                                        <label>PIN Code</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="pin" required placeholder="Postal PIN Please" value={this.state.pin} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Message</label>
                                        <textarea type="text" name="message" required className="form-control" placeholder="Message" value={this.state.message} onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="w-100 mt-5">
                                        <h3>Final Invoice : </h3>
                                            <span>Cost <strong>&#8377;{this.reduceCart()}</strong> </span>
                                            {this.state.paymentInProcess ?
                                                <div className="loading"><img src="/images/icons/loading.gif"/></div>
                                            :
                                                <div className="my-btn my-5">
                                                    <button className="amitBtn">Pay now</button>
                                                </div>
                                            }
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        <div className="row">
                            <div className="col-sm-12">
                                <p>Empty Cart</p>
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
