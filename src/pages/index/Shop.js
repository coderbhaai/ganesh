import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import StarRating from '../parts/StarRating'

export class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories:                 [],
            subCategories:              [],
            tags:                       [],
            filter:                     [],
            products:                   [],
            cart:                       [],
            catSelected:                '',
            subCatSelected:             '',
            tagSelected:                '',
            currentPage:                1,
            itemsPerPage:               100,
            search:                     '',
            minValue:                   0,
            maxValue:                   20000,
            step:                       1000,
            firstValue:                 0,
            secondValue:                20000
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
        }else if(url[3]=='category'){
            this.fetchCategories(url[4], true)
        }else if(url[3]=='subcategory'){
            this.fetchCatSubcat(url[4], true)
        }else if(url[3]=='product-tag'){
            this.fetchTags(url[4], true)
        }        
    }

    callApi = async () => {
        const response = await fetch( '/admin/fetchShop' ); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            categories:             body.categories,
            products:               body.products,
            tags:                   body.tags,
            min:                    0,
            max:                    3000
        })
    }

    addToCart=(i)=>{
        var item = [i.id, i.qtySelected, 1, i.priceSelected, i.product, i.sku, i.url, JSON.parse(i.images)[0], parseInt( i.vendor ), i.shipping ]
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){ 
                    o[2]++
                    this.callSwal(o[4]+" in cart increased to "+o[2])
                }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
        }else{
            this.setState({ cart: [...this.state.cart, item] },()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
            this.callSwal(i.product + " added to cart ")
        }
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
        this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
    }

    qtyChanged=(i, e)=>{
        this.state.products.forEach((o)=>{
            if( o.id === parseInt(i.id) ){
                o.qtySelected = e.target.value
                JSON.parse( o.sku ).forEach((x)=>{
                    if( x[0] === e.target.value){
                        o.priceSelected = parseInt( x[1] )
                    }
                })
            }
        })
        this.setState({products: this.state.products})
    }
    
    filterCategory = (cat, check) => { 
        if(cat!== this.state.catSelected){ this.setState({ subCatSelected: '' }) }
        this.state.categories.forEach((o)=>{ if( o.tab1 == cat ){ o.isChecked = check }else{ o.isChecked = false } })
        this.setState({ categories: this.state.categories })
        if(check){ 
            this.setState({ catSelected: cat },()=>this.catSelected(cat)) 
        }else{ 
            this.setState({ 
                catSelected:        '',
                subCategories:      [],
                subCatSelected:     ''
            },()=>this.finalFilter())
        }
    }

    catSelected = async (cat) => {
        const response = await fetch( '/admin/catFilter/'+cat)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({ subCategories: body.subCategories },()=>this.finalFilter()) 
    }

    fetchCategories = async (cat, check) => {
        const response = await fetch( '/admin/fetchCategories')
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({ 
            tags:                   body.tags,
            categories:             body.categories,
            catSelected:            cat,
            subCatSelected:         ''
        },()=>{
            this.catSelected(cat),
            this.setCatFromOut(cat, check)
        }
        )
    }

    setCatFromOut=(cat, check)=>{
        this.state.categories.forEach((o)=>{ if( o.tab1 == cat ){ o.isChecked = check }else{ o.isChecked = false } })
        this.setState({ categories: this.state.categories })
    }

    filterSubCategory = async (subcat, check) => {
        this.state.subCategories.forEach((o)=>{
            if( o.tab1 == subcat ){ o.isChecked = check }else{ o.isChecked = false }
        })
        this.setState({ subCategories: this.state.subCategories })
        if(check){ this.setState({ subCatSelected: subcat },()=>this.finalFilter()) }else{ this.setState({ subCatSelected: ''},()=>this.finalFilter()) }
    }

    fetchCatSubcat = async (subcat, check) => {
        const response = await fetch( '/admin/fetchCatSubcat/'+subcat)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({ 
            categories:             body.categories,
            subCategories:          body.subCategories,
            tags:                   body.tags
        }
            ,()=>this.filterSubCategory(subcat, check)
        )
    }

    fetchTags = async (tag, check) => {
        const response = await fetch( '/admin/fetchCategories')
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({ 
            tags:                   body.tags,
            categories:             body.categories,
            tagSelected:            tag
        }
            ,()=>this.tagSelected(tag, check)
        )
    }

    tagSelected = async (tag, check) => {
        this.state.tags.forEach((o)=>{
            if( o.tab1 == tag ){ o.isChecked = check }else{ o.isChecked = false }
        })
        if(check){ this.setState({ tagSelected: tag },()=>this.finalFilter()) }else{ this.setState({ tagSelected: ''},()=>this.finalFilter()) }
    }

    filterTag = async (tag, check) => {
        this.state.tags.forEach((o)=>{
            if( o.tab1 == tag ){ o.isChecked = check }else{ o.isChecked = false }
        })
        if(check){ this.setState({ tagSelected: tag },()=>this.finalFilter()) }else{ this.setState({ tagSelected: ''},()=>this.finalFilter()) }
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

    finalFilter = async ()=>{
        const data={
            min:                parseInt(this.state.firstValue),
            max:                parseInt(this.state.secondValue),
            cat:                this.state.catSelected,
            subCat:             this.state.subCatSelected,
            tag:                this.state.tagSelected
        }
        axios.post('/admin/finalFilter', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                this.setState({ products: res.data.products })
            })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.products.filter((i)=>{ if(this.state.search == null) return i; else if(i.product.toLowerCase().includes(this.state.search.toLowerCase()) || i.category.toLowerCase().includes(this.state.search.toLowerCase()) || i.subcategory.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <div className="col-sm-3" key={index}>
                    <div className="card">
                        <div className="position-relative">
                            <a href={"/product/"+i.url}>
                                <img src={"/images/products/"+JSON.parse(i.images)[0]} className="position-relative"/>
                                { this.state.cart.some(x => x[0] === i.id) ?
                                    <div className="itemAdded">
                                        { this.state.cart.filter(o => o[0] === i.id).map(( o, index) => { return ( 
                                            <p key={index}>{o[1]} X &#8377;{o[3]} X {o[2]} Unit = &#8377;{o[2]*o[3]}</p> 
                                        )})}
                                    </div>
                                : null}
                            </a>
                        </div>
                        <div className="cartBtnGroup flex-sb">
                            <select onChange={(e)=>this.qtyChanged(i,e)}>
                                { JSON.parse( i.sku ).map((j, index)=>(
                                    <option key={index} value={j[0]}>{j[0]} @ &#8377; {j[1]}</option>
                                ))}
                            </select>
                            <div className="plusMinus">
                                <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)} style={{marginRight: '10px'}}/>
                                { this.state.cart.some(x => x[0] === i.id) ? <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/> : null }
                            </div>
                        </div>
                        <div>
                            <a href={"/product/"+i.url}>
                                <StarRating rating={i.rating}/>
                                <p style={{textAlign:'center', fontWeight:'700'}}>{i.product}</p>
                            </a>
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
                        <div className="col-sm-3 bg-white">
                            <div className="filter">
                                <h3>Filter by <span>Price</span></h3>
                                <div className="range-slider">
                                    <input type="range" value={this.state.firstValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step} onChange={this.handleChange.bind(this, "first")} onMouseUp={this.finalFilter}/>
                                    <input type="range" value={this.state.secondValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step} onChange={this.handleChange.bind(this, "second")} onMouseUp={this.finalFilter}/>
                                    <span>&#8377;{this.state.firstValue} - &#8377;{this.state.secondValue}</span>
                                </div>
                            </div>
                            <div className="filter">
                                <h3>Filter by <span>Categories</span></h3>
                                {this.state.categories.map((i, index)=>(
                                    <div className="filterCover" key={index}>
                                        <div className="onoffswitch">
                                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={i.tab1} onChange={(e)=>this.filterCategory(e.target.value, e.target.checked)} value={i.tab1} checked={i.isChecked}/>
                                            <label className="onoffswitch-label" htmlFor={i.tab1}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                        </div>
                                        <span style={{marginLeft:'10px'}}>{i.name}</span>
                                    </div>
                                ))}
                            </div>
                            {this.state.subCategories.length>0?
                                <div className="filter">
                                    <h3>Filter by <span>Sub Categories</span></h3>
                                    {this.state.subCategories.map((j,index2)=>(
                                        <div className="filterCover" key={index2}>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name={j.tab2} className="onoffswitch-checkbox" id={j.tab1} onChange={(e)=>this.filterSubCategory(e.target.value , e.target.checked)} value={j.tab1} checked={j.isChecked}/>
                                                <label className="onoffswitch-label" htmlFor={j.tab1}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                            </div>
                                            <span style={{marginLeft:'10px'}}>{j.name}</span>
                                        </div>
                                    ))}
                                </div>
                            : null}
                            <div className="filter">
                                <h3>Filter by <span>Tags</span></h3>
                                {this.state.tags.map((i, index)=>(
                                    <div className="filterCover" key={index}>
                                        <div className="onoffswitch">
                                            <input type="checkbox" name="tag" className="onoffswitch-checkbox" id={i.tab1} onChange={(e)=>this.filterTag(e.target.value , e.target.checked)} value={i.tab1} checked={i.isChecked}/>
                                            <label className="onoffswitch-label" htmlFor={i.tab1}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                        </div>
                                        <span style={{marginLeft:'10px'}}>{i.name}</span>
                                    </div>
                                ))}
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
                            <div className="row products">
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