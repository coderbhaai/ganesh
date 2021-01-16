import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import ReactImageMagnify from 'react-image-magnify';
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
import swal from 'sweetalert'
import StarRating from '../parts/StarRating'
import moment from "moment"
import BlogCarousel from '../blog/BlogCarousel'

export class Product extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:                   [],
            user:                   [],
            product:                {},
            currentImg:             '',
            topProducts:            [],
            relatedProducts:        [],
            finalRating:            [],
            reviews:                [],
            rating:                 '',
            review:                 '',
            reviewId:               '',
            oldRating:              '',
            allowReview:            false,
            reviewSubmitted:        false,
            isSeller:               false,
            blogs:                  this.props.blogs
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    onEditorChange1( evt1 ) { this.setState( { review: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { review: changeEvent1.target.value } ) }
    changeImg=(i)=>{ this.setState({ currentImg: i }) }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ 
            this.setState({ 
                cart: JSON.parse(localStorage.getItem('ECcart')) || [],
                user: JSON.parse(localStorage.getItem('ECuser')) || [],
            })
        }
        const url = window.location.href.split("/").pop()
        this.callApi(url)
    }

    callApi = async (url) => {
        const response = await fetch( '/admin/fetchproduct/'+url ); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
            this.setState({
                id:                     body.product.id,
                finalRating:            JSON.parse( body.product.rating ),
                product:                body.product,
                topProducts:            body.topProducts,
                currentImg:             JSON.parse( body.product.images )[0],
                reviews:                body.reviews
            }
            ,()=> this.checkForReview(body.product.id, body.product.vendor)
        )
        const response2 = await fetch('/suggest'); 
        const body2 = await response2.json();
        if (response2.status !== 200) throw Error(body2.message)
        this.setState({
            blogs: body2.blogs
        })
    }

    checkForReview=async(id, vendor)=>{
        if(this.state.user.id === vendor){ this.setState({ isSeller: true }) }
        if(id != vendor && this.state.user.id){
            const response = await fetch( '/admin/fetchReview/'+id+'/'+this.state.user.id ); 
            const body = await response.json()
            if (response.status !== 200) throw Error(body.message)
            if (body.review){
                this.setState({ 
                    reviewSubmitted:        true,
                    reviewId:               body.review.id,
                    oldRating:              body.review.rating,
                    rating:                 body.review.rating,
                    review:                 body.review.review,
                    reviews:                body.data
                })
            }else{
                this.setState({ allowReview: true })
            }
        }
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
            this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
        }else{
            this.setState({ cart: [...this.state.cart, item] },()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
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
        this.setState({cart: this.state.cart},()=>localStorage.setItem('ECcart', JSON.stringify(this.state.cart)))
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

    addReview=(e)=>{
        var xx =  parseFloat( ((this.state.finalRating[0]*this.state.finalRating[1]) + parseInt(this.state.rating) )/(this.state.finalRating[1]+1) ).toFixed(2)
        var productRating = JSON.stringify( [xx, parseInt( this.state.finalRating[1]+1 )] )
        e.preventDefault()
        if(!this.state.rating){
            this.callSwal("Rating can not be left blank")
        } else if(!this.state.review){
            this.callSwal("Review can not be left blank")
        }else{
            const data={
                id:                     this.state.id,
                rating:                 this.state.rating,
                review:                 this.state.review,
                userId:                 this.state.user.id,
                finalRating:            productRating
            } 
            axios.post('/admin/addReview', data)
                .catch(err=>console.log('err', err))
                .then(res=>{
                    if(res.data.success){
                        this.setState({ 
                            finalRating:                JSON.parse( productRating ),
                            allowReview:                false,
                            reviewSubmitted:            true,
                            reviews:                    [...this.state.reviews, res.data.data ],
                            oldRating:                  this.state.rating
                        })
                        this.callSwal(res.data.message)
                    }
                })
        }
    }

    updateReview=(e)=>{
        var xx =  parseFloat( ((this.state.finalRating[0]*this.state.finalRating[1]) + parseInt(this.state.rating) - parseInt(this.state.oldRating) )/(this.state.finalRating[1]) ).toFixed(2)
        var productRating = JSON.stringify( [xx, parseInt( this.state.finalRating[1] )] )
        e.preventDefault()
        if(!this.state.rating || !this.state.review){
            this.callSwal("Rating and Review can not be left blank")
        }else{
            const data={
                id:                     this.state.id,
                reviewId:               this.state.reviewId,
                rating:                 this.state.rating,
                review:                 this.state.review,
                userId:                 this.state.user.id,
                finalRating:            productRating
            } 
            axios.post('/admin/updateReview', data)
                .catch(err=>console.log('err', err))
                .then(res=>{
                    if(res.data.success){
                        this.setState({ 
                            finalRating:                JSON.parse( productRating ),
                            allowReview:                false,
                            reviewSubmitted:            true,
                            oldRating:                  this.state.rating,
                            reviews:                      this.state.reviews.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x )
                        })
                        this.callSwal(res.data.message)
                    }
                })
        }
    }

    render() {
        return (
            <> 
                <Header cart={this.state.cart.length}/>
                { this.state.product ?
                    <div className="container bg-white my-5">
                        <div className="row mt-5 py-3 product">
                            <div className="col-sm-3 imgZoom">
                                { this.state.product.images && this.state.currentImg ?<>
                                    <ReactImageMagnify {...{
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: '/images/products/'+this.state.currentImg
                                        },
                                        largeImage: {
                                            src: '/images/products/'+this.state.currentImg,
                                            width: 600,
                                            height: 900
                                        }
                                    }} />
                                    <div className="thumbnail">
                                        {JSON.parse(this.state.product.images).map((i, index)=>( <img key={index} src={"/images/products/"+i} onClick={()=>this.changeImg(i)}/>))}
                                    </div>
                            </>: null}
                            </div>
                            <div className="col-sm-9">
                                <h1 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>{this.state.product.product}</span></h1>
                                <StarRating rating={this.state.product.rating}/>
                                <hr/>
                                <p className="soldBy"><span>Sold by:</span> {this.state.product.name}</p>
                                <hr/>
                                {this.state.product.sku? <>
                                    <p>Price:</p>
                                    <table className="table pricing">
                                        <thead>
                                            <tr>
                                                <td>SKU</td>
                                                <td>Qty</td>
                                                <td>Price</td>
                                                <td>In stock</td>
                                                <td>Discount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {JSON.parse(this.state.product.sku).map((j, index)=>(
                                                <tr key={index}>
                                                    <td>{j[4]}</td>
                                                    <td>{j[0]}</td>
                                                    <td>&#8377;{j[1]}</td>
                                                    <td>{j[2] ='1'? <span>Yes</span> : <span>No</span> }</td>
                                                    <td>&#8377;{j[3]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p>Add to cart</p>
                                    <div className="cartBtnGroup flex-sb" style={{opacity:'1'}}>
                                        <select onChange={(e)=>this.qtyChanged(i,e)}>
                                            { JSON.parse(this.state.product.sku ).map((j, index)=>(
                                                <option key={index} value={j[0]}>{j[0]} @ &#8377; {j[1]}</option>
                                            ))}
                                        </select>
                                        <div className="plusMinus">
                                            <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(this.state.product)} style={{marginRight: '10px'}}/>
                                            { this.state.cart.some(x => x[0] === this.state.product.id) ? <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(this.state.product)}/> : null }
                                        </div>
                                    </div>

                                </>:null }
                                <hr/>
                                <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.product.shortDesc }} />
                            </div>
                        </div>
                    </div>
                : null }
                <div className="container my-5 extraProducts">
                    <div className="row mt-5">
                        <div className="col-sm-3">
                            <div className="bg-white" style={{padding:'10px', marginBottom:'1em'}}>
                                <p className="soldBy"><span>Sold by:</span> {this.state.product.name}</p>
                                <hr style={{margin: '0 0 7px'}}/>
                                <div className="text-center">
                                    <StarRating rating={this.state.product.rating}/>
                                </div>
                                {this.state.product.rating ? <p className="reviewCount">{JSON.parse(this.state.product.rating)[1]} Customer Reviews</p> : null}
                            </div>
                            <div className="bg-white topProducts" style={{padding:'10px'}}>
                                <p className="text-center">Top selling products</p>
                                <hr style={{margin: '0 0 7px'}}/>
                                {this.state.topProducts.map((i, index)=>(
                                    <a href={"/product/"+i.url}>
                                        <div className="flex-sb mb-3" key={index}>
                                                <img key={index} src={"/images/products/"+JSON.parse(i.images)[0]}/>
                                                <div className=" w-100" style={{paddingLeft:'5px'}}>
                                                    <p style={{fontWeight:'600'}}>{i.product}</p>
                                                    <p>&#8377;{i.minPrice}</p>
                                                </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-9 relatedProducts p-0">
                            <section className="box">
                                <div className="bg-white reviewsDesc row">
                                    <div className="col-sm-12">
                                        <ul className="nav nav-tabs flex-h">
                                            <li><a className="active" data-toggle="tab" href="#home">Description</a></li>
                                            <li><a data-toggle="tab" href="#menu1">Reviews</a></li>
                                            { this.state.reviewSubmitted ?
                                                <li><a data-toggle="tab" href="#menu2">Update your Review</a></li>
                                            : this.state.allowReview && !this.state.isSeller ?
                                                <li><a data-toggle="tab" href="#menu2">Submit a Review</a></li>
                                            : 
                                            null
                                            }
                                        </ul>
                                        <div className="tab-content">
                                            <div id="home" className="tab-pane fade in active show">
                                                <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>{this.state.product.product}</span></h3>
                                                <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.product.longDesc }} />
                                            </div>
                                            <div id="menu1" className="tab-pane fade">
                                            {this.state.reviews.map((i, index)=>(
                                                <div key={index} className="mb-3">
                                                    <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: i.review }} />
                                                    <p style={{textAlign:'right'}}>-<strong>{i.name}</strong> on {moment(i.updated_at).format("DD MMMM  YYYY")}</p>
                                                    {index!=this.state.reviews.length-1 ? <hr/> : null}
                                                </div>
                                            ))}
                                            </div>
                                            <div id="menu2" className="tab-pane fade review">
                                                { this.state.reviewSubmitted ?
                                                    <form encType="multipart/form-data" onSubmit={this.updateReview}>
                                                        <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>Want to update your review?</span></h3>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <label>Rating</label>
                                                                <div className="star-rating m-0">
                                                                    <span className="rating">
                                                                        <input type="radio" className="rating-input" id="rating-input-1-1" name="rating" value="5" onChange={(e)=>this.onChange(e)} checked={this.state.rating== 5 ? true : false}/><label htmlFor="rating-input-1-1" className="rating-star"></label>
                                                                        <input type="radio" className="rating-input" id="rating-input-1-2" name="rating" value="4" onChange={(e)=>this.onChange(e)} checked={this.state.rating== 4 ? true : false}/><label htmlFor="rating-input-1-2" className="rating-star"></label>
                                                                        <input type="radio" className="rating-input" id="rating-input-1-3" name="rating" value="3" onChange={(e)=>this.onChange(e)} checked={this.state.rating== 3 ? true : false}/><label htmlFor="rating-input-1-3" className="rating-star"></label>
                                                                        <input type="radio" className="rating-input" id="rating-input-1-4" name="rating" value="2" onChange={(e)=>this.onChange(e)} checked={this.state.rating== 2 ? true : false}/><label htmlFor="rating-input-1-4" className="rating-star"></label>
                                                                        <input type="radio" className="rating-input" id="rating-input-1-5" name="rating" value="1" onChange={(e)=>this.onChange(e)} checked={this.state.rating== 1 ? true : false}/><label htmlFor="rating-input-1-5" className="rating-star"></label>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <label>Review</label>
                                                                <CKEditor 
                                                                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                                                    data={this.state.review}
                                                                    review= {this.state.review}
                                                                    onChange={this.onEditorChange1}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="my-btn">
                                                            <button className="amitBtn" type="submit">Submit</button> 
                                                        </div>
                                                    </form>
                                                : this.state.allowReview && !this.state.isSeller ?
                                                    <form encType="multipart/form-data" onSubmit={this.addReview}>
                                                        <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>Submit a review</span></h3>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <label>Rating</label>
                                                                <div className="star-rating m-0">
                                                                <span className="rating">
                                                                    <input type="radio" className="rating-input" id="rating-input-1-1" name="rating" value="5" onChange={(e)=>this.onChange(e)}/><label htmlFor="rating-input-1-1" className="rating-star"></label>
                                                                    <input type="radio" className="rating-input" id="rating-input-1-2" name="rating" value="4" onChange={(e)=>this.onChange(e)}/><label htmlFor="rating-input-1-2" className="rating-star"></label>
                                                                    <input type="radio" className="rating-input" id="rating-input-1-3" name="rating" value="3" onChange={(e)=>this.onChange(e)}/><label htmlFor="rating-input-1-3" className="rating-star"></label>
                                                                    <input type="radio" className="rating-input" id="rating-input-1-4" name="rating" value="2" onChange={(e)=>this.onChange(e)}/><label htmlFor="rating-input-1-4" className="rating-star"></label>
                                                                    <input type="radio" className="rating-input" id="rating-input-1-5" name="rating" value="1" onChange={(e)=>this.onChange(e)}/><label htmlFor="rating-input-1-5" className="rating-star"></label>
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <label>Review</label>
                                                                <CKEditor 
                                                                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                                                    review= {this.state.review}
                                                                    onChange={this.onEditorChange1}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="my-btn">
                                                            <button className="amitBtn" type="submit">Submit</button> 
                                                        </div>
                                                    </form>
                                                :
                                                    <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>Please login to submit a review</span></h3>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="box mt-5">
                                <div className="amitBtnGroup">
                                    <div className="position-relative">
                                        <h2>Related Products</h2>
                                    </div>
                                    <button className="amitBtn"><a href={"/category/"+this.state.product.category}>View More</a></button>
                                </div>
                                <div className="row bg-white py-3">
                                    {this.state.topProducts.map((i, index)=>(
                                        <div className="col-sm-4 mb-3" key={index}>
                                            <a href={"/product/"+i.url} className="flex-sb">
                                                <img key={index} src={"/images/products/"+JSON.parse(i.images)[0]}/>
                                                <div className=" w-100" style={{paddingLeft:'10px'}}>
                                                    <p style={{fontWeight:'600'}}>{i.product}</p>
                                                    <StarRating rating={i.rating}/>
                                                    <p>&#8377;{i.minPrice}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <BlogCarousel blogs={this.state.blogs}/>
                <Footer/>
            </> 
        )
    }
}

export default Product
