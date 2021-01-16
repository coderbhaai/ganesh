import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'

const block = [
    'sex',
    'girl',
    'porn',
    'nude',
    'horny',
    'bitch',
    'Viagra',
    'Gambling',
    'Cryptocurrencies',
    'Cryptocurrency',
    '$',
    'Bitcoin',
    'USD',
    'www',
    'htttp'
]
export class Cart extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:                   [],
            cost:                   0,
            vendorList:             [],
            discount:               0,
            discountBy:             null,
            coupon:                 '',
            total:                  '',
            stateShip:              [],
            cityShip:               [],
            shippingCharges:        '',
            waitforShipping:        true,
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
            finalCart:              []
        }
    }
    
    onChange= (e) => { 
        this.setState({ [e.target.name]: e.target.value })
        if(!this.state.waitforShipping){ this.setState({ waitforShipping: true }) }
    }
    couponChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('ECcart')) || [] },()=>this.getShipping()) }
    }
    
    getShipping=()=>{
        var xx = []
        var cost = this.state.cart.reduce( function(cnt, i){ return cnt + i[2]*i[3]; }, 0)
        this.state.cart.forEach(i=>{ if (!xx.includes( i[8])){ xx.push(i[8]) } })
        this.setState({ 
            vendorList:         xx,
            cost:               cost
        },()=>this.callApi())
    }

    callApi = async () => {
        const response = await fetch( '/admin/getShipping/'+JSON.stringify(this.state.vendorList) )
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            stateShip:          body.stateShip,
            cityShip:           body.cityShip
        })
    }

    removeFromCart=(i)=>{
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o, index)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){
                    if(o[2]>1){ 
                        o[2]--
                        this.callSwal(i.product + " in cart reduced to "+ o[2])
                    }else{ 
                        this.state.cart.splice(index, 1)
                        this.callSwal(i.product + " removed from cart ")
                    }
                }
            })
        }
        this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
    }

    changeQty=( i, e , index)=>{
        if( this.state.cart.some( j => j[0] === parseInt(i[0]) && j[1] == e.target.value)){
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i[0]) && o[1] === e.target.value && o[index]!= index){
                    o[2]= o[2] + i[2]
                }
            })
            this.state.cart.splice(index, 1)
        }else{
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i[0]) && o[1] == i[1]  ){
                    o[1]= e.target.value
                    JSON.parse(i[5]).forEach((k)=>{
                        if( k[0] === e.target.value ){ o[3]= k[1] }
                    })
                }
            })
        } 
        this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
        this.totalBill()
    }

    changeUnit=(i, e)=>{
        this.state.cart.forEach(o =>{
            if( o[0] === parseInt(i[0]) && o[1] === i[1] ){
                o[2]= parseInt( e.target.value )
            }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
        this.totalBill()
    }

    checkCoupon=()=>{
        axios.get( '/admin/checkCoupon/'+ this.state.coupon.toUpperCase()+'/'+ JSON.stringify(this.state.vendorList) )
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.discount){
                    this.callSwal('We are happy to provide you discount of Rs' + res.data.discount.amount)
                    this.setState({
                        discount:           res.data.discount.amount,
                        discountBy:         res.data.discount.seller,
                    },()=>this.totalBill())
                }else{
                    this.setState({
                        discount:           0
                    },()=>this.totalBill())
                    this.callSwal('Sorry, the coupon is invalid or expired')
                }
            })
    }

    applyShipping=()=>{
        var finalCart=         new Array()
        for(var i = 0; i < this.state.vendorList.length; i++){
            var xx =         new Array()
            this.state.cart.forEach(async (j, index2)=>{
                if (this.state.vendorList[i] == j[8] ){ xx.push(j) }
            })
            finalCart.push(xx)
        }
        this.setState({ finalCart: finalCart })
        if( !this.state.name || !this.state.email || !this.state.phone || !this.state.country || !this.state.state || !this.state.city || !this.state.address || !this.state.pin || !this.state.message){
            this.callSwal("Please provide complete address")
        }else{
            if( this.state.stateShip.length && this.state.stateShip.some( i => i.name.toUpperCase() === this.state.state.toUpperCase() )){
                this.state.cart.forEach(i=>{
                    this.state.stateShip.forEach(j=>{
                        if(i[8] == j.seller && j.name.toUpperCase() === this.state.state.toUpperCase()){
                            i[9] = {amount: j.amount, type:j.shippingType}
                        }
                    })
                })
            }
            if( this.state.cityShip.length && this.state.cityShip.some( i => i.name.toUpperCase() === this.state.city.toUpperCase() )){
                this.state.cart.forEach(i=>{
                    this.state.cityShip.forEach(j=>{
                        if(i[8] == j.seller && j.name.toUpperCase() === this.state.city.toUpperCase()){
                            i[9] = {amount: j.amount, type:j.shippingType}
                        }
                    })
                })
            }        
            this.setState({
                cart:                   this.state.cart,
                waitforShipping:        false
            }
                ,()=>{
                    localStorage.setItem('ECcart', JSON.stringify(this.state.cart)),
                    this.totalBill()
                }
            )
        }
    }

    totalBill=()=>{
        var bill = 0
        var shippingCharges= 0
        this.state.cart.forEach(i=>{
            if(i[9].type=='Flat'){
                bill = bill + parseInt( ( i[2]*i[3]) + parseInt( i[9].amount ))
                shippingCharges = shippingCharges + parseInt( i[9].amount )
            }else if(i[9].type=='Variable'){
                bill = bill+ parseInt( (i[2]*i[3])*(parseInt( i[9] ).amount)/100 )
                shippingCharges = shippingCharges + parseInt( (i[2]*i[3])*(parseInt( i[9] ).amount)/100)
            }
        })
        this.setState({
            total:                  bill-this.state.discount,
            shippingCharges:        shippingCharges
        })
    }

    payment=(e)=>{
        e.preventDefault()
        const data={
            address:                JSON.stringify( [this.state.name, this.state.email, this.state.phone, this.state.message, this.state.country, this.state.state, this.state.city, this.state.address, this.state.pin] ),
            cart:                   JSON.stringify( this.state.cart ),
            finalCart:              JSON.stringify( this.state.finalCart ),
            seller:                 JSON.stringify( this.state.vendorList ),
            invoice:                JSON.stringify( [this.state.cost, this.state.shippingCharges, this.state.discount, this.state.discountBy, this.state.total] ),
            email :                 this.state.email,
            name:                   this.state.name
        } 
        axios.post('/admin/placeOrder', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                this.setState({ cart: [] },()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
                if(res.data.success){ 
                    localStorage.setItem('ECmessage', res.data.message)
                    window.location.href = '/shop'
                }
            })
    }

    removeItem=(index)=>{
        this.state.cart.splice(index, 1)
        this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
        this.totalBill()
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
                                            <td>No. of Items</td>
                                            <td>Rate</td>
                                            <td>Shipping</td>
                                            <td>Cost</td>
                                            <td>Remove</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.cart.map((i, index)=>{ return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td><a href={"/product/"+i[6]}><img src={"/images/products/"+i[7]} className="productImage"/>{i[4]}</a></td>
                                                <td className="mAuto">
                                                    <select className="form-control" required value={i[1]} onChange={(e)=>this.changeQty(i, e, index)}>
                                                        { JSON.parse(i[5]).map((j, index)=>(
                                                            <option value={j[0]} key={index}>{j[0]}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="mAuto">
                                                    <input type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="1" className="form-control unit" required value={i[2]} onChange={(e)=>this.changeUnit( i, e)} style={{maxWidth:'90px', margin:'0 auto'}}/>
                                                </td>
                                                <td className="text-center">&#8377;{i[3]}</td>
                                                <td className="text-center">
                                                    {this.state.waitforShipping?
                                                        <p className="text-center">Waiting for Address</p>
                                                    :
                                                        <>&#8377;{i[9].amount}</>
                                                    }
                                                </td>
                                                <td className="text-center">&#8377;{i[2]*i[3] ? i[2]*i[3] : 0 }</td>
                                                <td className="text-center"><img className="remove" src="/images/icons/wrong-red.svg" onClick={()=>this.removeItem(index)}/></td>
                                            </tr>
                                        )})}
                                        { this.state.cart.length>0 ?
                                        <tr>
                                            <td className="text-center" colSpan="5"><strong>Total</strong></td>
                                            <td className="text-center">{this.state.shippingCharges? <strong>&#8377;{this.state.shippingCharges}</strong> : <>Waiting for Address</>}</td>
                                            <td className="text-center"><strong>&#8377;{ this.state.cart.reduce( function(cnt, i){ return cnt + i[2]*i[3]; }, 0) }</strong></td>
                                            <td></td>
                                        </tr>
                                        : null}
                                    </tbody>
                                </table>
                                <p><strong>Note:</strong> Shipping charges depend on your address.</p>
                                <div className="col-sm-12 mt-3">
                                    <label><strong>Apply Coupon</strong></label>
                                    <div className="couponCode">
                                        <input className="form-control" type="text" name="coupon" required placeholder="Coupon Code" value={this.state.coupon} onChange={this.couponChange}/>
                                        <div className="my-3">
                                            <button className="amitBtn" onClick={this.checkCoupon}>Apply coupon</button>
                                        </div>
                                    </div>
                                    { this.state.discount ? <p>We are happy to provide you discount of <strong>&#8377;{this.state.discount}</strong></p> :null}                                
                                </div>
                            </div>
                        </div>
                        <form encType="multipart/form-data" onSubmit={this.payment} className="my-5">
                            <h2 className="heading">Shipping Address</h2>
                            <p className="text-center">Please note: Shipping charges apply as per region. You can check the complete list of <a target="_blank" href="/shipping">shipping charges</a>.</p>
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
                                { this.state.name && this.state.email && this.state.phone && this.state.country && this.state.state && this.state.city && this.state.address && this.state.pin && this.state.message && !this.state.waitforShipping?
                                    <div className="w-100 mt-5">
                                        <h3>Final Invoice : </h3>
                                            <span>Cost <strong>&#8377;{ this.state.cart.reduce( function(cnt, i){ return cnt + i[2]*i[3]; }, 0) }</strong> </span>
                                            { this.state.shippingCharges ? <span>+ Shipping charges of <strong>&#8377;{this.state.shippingCharges}</strong></span> : null } 
                                            { this.state.discount ? <span> - Discount of <strong>&#8377;{this.state.discount}</strong></span> :null} = Total Amount <strong>&#8377;{this.state.total}</strong>
                                        <div className="my-btn my-5">
                                            <button className="amitBtn">Pay now</button>
                                        </div>
                                    </div>
                                : 
                                    <div className="my-btn my-5">
                                        <p className="amitBtn" onClick={this.applyShipping} style={{display:'inline'}}>Apply all charges to proceed for payment</p>
                                    </div>
                                }
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
