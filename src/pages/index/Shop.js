import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import StarRating from '../parts/StarRating'
const func = require('../parts/functions')

export class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories:                 [],
            filter:                     [],
            products:                   [],
            data:                       [],
            cart:                       [],
            catSelected:                [],
            minValue:                   0,
            maxValue:                   20000,
            step:                       50,
            firstValue:                 0,
            secondValue:                20000,
            currentPage:                1,
            itemsPerPage:               100,
            search:                     '',
            showFilter:                 'web'
        }
    }

    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    handleMinChange=(e)=>{ this.setState({ min: parseInt( e.target.value ) }) }
    handleMaxChange=(e)=>{ this.setState({ max: parseInt( e.target.value ) }) }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
        this.setState({firstValue: this.state.minValue, secondValue: this.state.maxValue})
        const url = window.location.href.split("/")
        if(url[3]=='shop'){ this.callApi()
        }    
    }

    callApi = async () => {
        const response = await fetch( '/admin/fetchShop' ); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            categories:             body.categories,
            products:               body.products,
            data:                   body.products,
            min:                    0,
            max:                    3000
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
    
    filterCategory = (cat, check) => { 
        this.state.categories.forEach((o)=>{ if( o.id == parseInt( cat ) ){ o.isChecked = check } })
        if(check){ this.setState({ catSelected: [ ...this.state.catSelected, parseInt( cat ) ] })
        }else{
            this.state.catSelected.map((x, index) => x == cat ? this.state.catSelected.splice(index, 1) : null)
            this.setState({ catSelected: this.state.catSelected })
        }
    }

    handleChange(name, e){
        let value = e.target.value;
        if(name === "second"){
                if(parseInt(this.state.firstValue) < parseInt(value)){
                this.setState({secondValue:value});
            }
        }
        else{
                if(parseInt(value) < parseInt(this.state.secondValue)){
                this.setState({firstValue: value});
            }
        }
    }

    showFilter=()=>{ this.setState({ showFilter: 'mobile'}) }
    hideFilter=()=>{ this.setState({ showFilter: 'web'}) }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.products.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i } })
        .filter((i)=>{ if(i.price>parseInt( this.state.firstValue ) && i.price<parseInt( this.state.secondValue ) ) return i; })
        .filter((i)=>{ if(this.state.catSelected.length){ for (var j = this.state.catSelected.length - 1; j >= 0; --j) { if( JSON.parse( i.category ).includes(this.state.catSelected[j]) ) { return i } } } else { return i } })
        .slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <div className="col-sm-3 mb-3" key={index}>
                    <div style={{'overflow':'hidden'}}>
                        <div className="imgBox">
                            <a href={"/product/"+i.url}>
                                {JSON.parse(i.images)[0] ?
                                    <img src={"/images/product/"+JSON.parse(i.images)[0]} alt={JSON.parse(i.images)[0].replace('.jpg', '').replace('.png', '').replace(/_/g, ' ').replace(/-/g, ' ')}/>
                                :   <img src="/images/logo.svg" class="logo" alt="Pujarambh Logo" width="100" height="57"></img>
                                }
                            </a>
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
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.products.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header cart={this.state.cart.length}/>
                <div className="container my-5">
                    <h1 className="heading"><span>Shop to your </span> heart's content</h1>
                    <div className="row mt-5">
                        <div className="col-sm-3 bg-white text-center">
                            {this.state.showFilter=='web'?
                                <button className="clientBtn mobile showFilter" onClick={this.showFilter}>Show Filters</button>
                            : 
                                <button className="clientBtn mobile showFilter" onClick={this.hideFilter}>Hide Filters</button>
                            }

                            <div className={this.state.showFilter}>
                                <div className="filter">
                                    <h3>Filter by <span>Price</span></h3>
                                    <div className="range-slider">
                                        <input type="range" value={this.state.firstValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step} onChange={this.handleChange.bind(this, "first")}/>
                                        <input type="range" value={this.state.secondValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step} onChange={this.handleChange.bind(this, "second")}/>
                                        <span>&#8377;{this.state.firstValue} - &#8377;{this.state.secondValue}</span>
                                    </div>
                                </div>
                                <div className="filter">
                                    <h3>Filter by <span>Categories</span></h3>
                                    {this.state.categories.map((i, index)=>(
                                        <div className="filterCover" key={index}>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="category" className="onoffswitch-checkbox" id={i.id} onChange={(e)=>this.filterCategory(e.target.value, e.target.checked)} value={i.id} checked={i.isChecked}/>
                                                <label className="onoffswitch-label" htmlFor={i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                            </div>
                                            <span style={{marginLeft:'10px'}}>{i.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="btn-pag">                            
                                <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{ marginRight:"1em"}}/>
                                <div style={{ width: 'unset'}}>
                                    <select className="form-control" required value={"Show "+ itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)} style={{ width:'unset', maxWidth:'unset' }}>
                                        <option>Show {itemsPerPage}</option>
                                        <option value="1">1</option> 
                                        <option value="25">25</option> 
                                        <option value="50">50</option> 
                                        <option value="100">100</option> 
                                    </select>
                                </div>
                            </div>
                            <div className="row product">
                                {this.state.products.length>0 ? renderItems :  <div className="w-100 text-center mt-5"><h2>Sorry we couldn't find anything for these parameters</h2></div> }
                            </div>
                            <div><ul className="page-numbers">{renderPagination}</ul></div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Shop