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
const func = require('../parts/functions')

export class Product extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:                   [],
            product:                {},
            incList:                [],
            catProducts:            [],
            currentImg:             '',
            topProducts:            [],
            relatedProducts:        [],
            finalRating:            [],
            reviews:                [],
            rating:                 0,
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
    onEditorChange1( evt1 ) { this.setState( { review: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { review: changeEvent1.target.value } ) }
    changeImg=(i)=>{ this.setState({ currentImg: i }) }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined"){ 
            this.setState({ 
                cart: JSON.parse(localStorage.getItem('cart')) || [],
                user: JSON.parse(localStorage.getItem('user')) || [],
            })
        }
        const url = window.location.href.split("/").pop()
        this.callApi(url)
    }

    callApi = async (url) => {
        const response = await fetch( '/admin/fetchproduct/'+url ); 
        const body = await response.json()
        console.log('body', body)
            this.setState({
                id:                     body.product.id,
                product:                body.product,
                finalRating:            JSON.parse( body.product.rating ),
                incList:                body.incList,
                catProducts:            body.catProducts,
                currentImg:             JSON.parse( body.product.images )[0],
                reviews:                body.reviewList
            },()=> this.checkForReview( body.product.id ))

            
                            


        // const response2 = await fetch('/suggest'); 
        // const body2 = await response2.json();
        // if (response2.status !== 200) throw Error(body2.message)
        // this.setState({
        //     blogs: body2.blogs
        // })
    }

    checkForReview=async(id)=>{
        if(this.state.user.id){
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
                    reviews:                body.data,
                    allowReview:            false,
                })
            }else{
                this.setState({ allowReview: true })
            }
        }else{
            console.log('Not Logged in')
        }
    }

    addToCart=(i)=>{
        console.log('i', i)
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
            func.callSwal("Rating can not be left blank")
        } else if(!this.state.review){
            func.callSwal("Review can not be left blank")
        }else{
            const data={
                id:                     this.state.id,
                userId:                 this.state.user.id,
                rating:                 this.state.rating,
                review:                 this.state.review,
                finalRating:            productRating
            } 
            axios.post('/admin/addReview', data)
                .catch(err=>console.log('err', err))
                .then(res=>{
                    console.log('res', res)
                    if(res.data.success){
                        this.setState({ 
                            finalRating:                JSON.parse( productRating ),
                            allowReview:                false,
                            reviewSubmitted:            true,
                            reviews:                    [...this.state.reviews, res.data.data ],
                            oldRating:                  this.state.rating
                        })
                        func.callSwal(res.data.message)
                    }
                })
        }
    }

    updateReview=(e)=>{
        var xx =  parseFloat( ((this.state.finalRating[0]*this.state.finalRating[1]) + parseInt(this.state.rating) - parseInt(this.state.oldRating) )/(this.state.finalRating[1]) ).toFixed(2)
        var productRating = JSON.stringify( [xx, parseInt( this.state.finalRating[1] )] )
        e.preventDefault()
        if(!this.state.rating || !this.state.review){
            func.callSwal("Rating and Review can not be left blank")
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
                        func.callSwal(res.data.message)
                    }
                })
        }
    }

    productRating=(value)=>{
        console.log('value', value)
        this.setState({ rating: value})
    }

    render() {
        console.log('this.state', this.state)
        const count = Math.round( this.state.incList.length/4 )
        return (
            <> 
                <Header cart={this.state.cart.length}/>
                { this.state.product ?
                    <div className="container singleProduct">
                        <div className="row mt-5 py-3 product">
                            <div className="col-sm-3 imgZoom">
                                { this.state.product.images && this.state.currentImg ?
                                    <>
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: '/images/product/'+this.state.currentImg
                                            },
                                            largeImage: {
                                                src: '/images/product/'+this.state.currentImg,
                                                width: 600,
                                                height: 900
                                            }
                                        }} />
                                        <div className="thumbnail">
                                            {JSON.parse(this.state.product.images).map((i, index)=>( <img key={index} src={"/images/product/"+i} onClick={()=>this.changeImg(i)}/>))}
                                        </div>
                                    </>
                                : null}
                            </div>
                            <div className="col-sm-6">
                                {this.state.product.rating? <StarRating rating={JSON.parse( this.state.product.rating)[0]}/> : null }
                                <h1 style={{textAlign:'left', marginBottom:'0'}}><span>{this.state.product.name}</span></h1>
                                <section className="not-found-controller mb-5" dangerouslySetInnerHTML={{ __html: this.state.product.shortDesc }} />
                                <h3 className="text-left mb-3">Add to cart</h3>
                                <div className="cartBtnGroup flex-sb">
                                    <div className="plusMinus">
                                        <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(this.state.product)} style={{marginRight: '10px'}}/>
                                        { this.state.cart.some(x => x[1] === this.state.product.id) ? <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(this.state.product)}/> : null }
                                    </div>
                                </div>
                                <h2 className="heading">Inclusions</h2>
                                <div className="row inclusions">
                                    <div className="col-sm-4"><ul>{this.state.incList.slice(0, count).map((i,index)=>( <li key={index}>{i.text} - {i.tab1}</li>))}</ul></div>
                                    <div className="col-sm-4"><ul>{this.state.incList.slice(count, count*2).map((i,index)=>( <li key={index}>{i.text} - {i.tab1}</li>))}</ul></div>
                                    <div className="col-sm-4"><ul>{this.state.incList.slice(count*2, this.state.incList.length).map((i,index)=>( <li key={index}>{i.text} - {i.tab1}</li>))}</ul></div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="bg-white sideProducts" style={{padding:'10px'}}>
                                    <p className="text-center">Related Products</p>
                                    <hr style={{margin: '0 0 7px'}}/>
                                    {this.state.catProducts.map((i, index)=>(
                                        <div className="flex-sb mb-3" key={index}>
                                            <a href={"/product/"+i.url}>
                                                <img key={index} src={"/images/product/"+JSON.parse(i.images)[0]}/>
                                                <div className=" w-100" style={{paddingLeft:'5px'}}>
                                                    <div className="text-center">
                                                        {i.rating? <StarRating rating={JSON.parse( i.rating)[0]}/> : null }
                                                    </div>
                                                    <p style={{fontWeight:'600'}}>{i.name}</p>
                                                    <p>&#8377;{i.price}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                : null }
                <div className="container my-5 extraProducts">
                    <div className="row mt-5">
                        <div className="col-sm-12 relatedProducts p-0">
                            <section className="box">
                                <div className="bg-white reviewsDesc row">
                                    <div className="col-sm-12">
                                        <ul className="nav nav-tabs flex-h">
                                            <li><a className="active" data-toggle="tab" href="#home">Description</a></li>
                                            {this.state.reviews.length? <li><a data-toggle="tab" href="#menu1">Reviews</a></li> : null}
                                            { this.state.reviewSubmitted ?
                                                <li><a data-toggle="tab" href="#menu2">Update your Review</a></li>
                                            : this.state.allowReview ?
                                                <li><a data-toggle="tab" href="#menu2">Submit a Review</a></li>
                                            : 
                                            null
                                            }
                                        </ul>
                                        <div className="tab-content">
                                            <div id="home" className="tab-pane fade in active show">
                                                <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>{this.state.product.name}</span></h3>
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
                                                                    {/* <span className="rating">
                                                                        <div><input type="radio" className="rating-input" id="rating-input-1-1" name="rating" value="5" onChange={(e)=>this.onChange(e)} checked={this.state.rating>= 1 ? true : false}/><label htmlFor="rating-input-1-1" className="rating-star"></label></div>
                                                                        <div><input type="radio" className="rating-input" id="rating-input-1-2" name="rating" value="4" onChange={(e)=>this.onChange(e)} checked={this.state.rating>= 2 ? true : false}/><label htmlFor="rating-input-1-2" className="rating-star"></label></div>
                                                                        <div><input type="radio" className="rating-input" id="rating-input-1-3" name="rating" value="3" onChange={(e)=>this.onChange(e)} checked={this.state.rating>= 3 ? true : false}/><label htmlFor="rating-input-1-3" className="rating-star"></label></div>
                                                                        <div><input type="radio" className="rating-input" id="rating-input-1-4" name="rating" value="2" onChange={(e)=>this.onChange(e)} checked={this.state.rating>= 4 ? true : false}/><label htmlFor="rating-input-1-4" className="rating-star"></label></div>
                                                                        <div><input type="radio" className="rating-input" id="rating-input-1-5" name="rating" value="1" onChange={(e)=>this.onChange(e)} checked={this.state.rating= 5 ? true : false}/><label htmlFor="rating-input-1-5" className="rating-star"></label></div>
                                                                    </span> */}
                                                                    <select className="form-control mb-3" name="rating" onChange={this.onChange} value={this.state.rating}>
                                                                        <option value=''>Give rating</option>
                                                                        <option value='1'>1 Star</option>
                                                                        <option value='2'>2 Star</option>
                                                                        <option value='3'>3 Star</option>
                                                                        <option value='4'>4 Star</option>
                                                                        <option value='5'>5 Star</option>
                                                                    </select>
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
                                                                    {/* <span className="rating">
                                                                        <div onClick={()=>this.productRating(1)}><input type="radio" className="rating-input" id="rating-input-1-1" name="rating" onChange={this.onChange} checked={this.state.rating>= 1 ? true : false}/><label htmlFor="rating-input-1-1" className="rating-star"></label></div>
                                                                        <div onClick={()=>this.productRating(2)}><input type="radio" className="rating-input" id="rating-input-1-2" name="rating" onChange={this.onChange} checked={this.state.rating>= 2 ? true : false}/><label htmlFor="rating-input-1-2" className="rating-star"></label></div>
                                                                        <div onClick={()=>this.productRating(3)}><input type="radio" className="rating-input" id="rating-input-1-3" name="rating" onChange={this.onChange} checked={this.state.rating>= 3 ? true : false}/><label htmlFor="rating-input-1-3" className="rating-star"></label></div>
                                                                        <div onClick={()=>this.productRating(4)}><input type="radio" className="rating-input" id="rating-input-1-4" name="rating" onChange={this.onChange} checked={this.state.rating>= 4 ? true : false}/><label htmlFor="rating-input-1-4" className="rating-star"></label></div>
                                                                        <div onClick={()=>this.productRating(5)}><input type="radio" className="rating-input" id="rating-input-1-5" name="rating" onChange={this.onChange} checked={this.state.rating= 5 ? true : false}/><label htmlFor="rating-input-1-5" className="rating-star"></label></div>
                                                                    </span> */}
                                                                    {/* <span className="rating">
                                                                        <div onClick={(e)=>this.productRating(1)}>{this.state.rating>=1 ?<img src={"/images/icon/star.png"}/>: <img src={"/images/icon/yellow-star.png"}/>}</div>
                                                                        <div onClick={(e)=>this.productRating(2)}>{this.state.rating>=2 ?<img src={"/images/icon/star.png"}/>: <img src={"/images/icon/yellow-star.png"}/>}</div>
                                                                        <div onClick={(e)=>this.productRating(3)}>{this.state.rating>=3 ?<img src={"/images/icon/star.png"}/>: <img src={"/images/icon/yellow-star.png"}/>}</div>
                                                                        <div onClick={(e)=>this.productRating(4)}>{this.state.rating>=4 ?<img src={"/images/icon/star.png"}/>: <img src={"/images/icon/yellow-star.png"}/>}</div>
                                                                        <div onClick={(e)=>this.productRating(5)}>{this.state.rating=5 ?<img src={"/images/icon/star.png"}/>: <img src={"/images/icon/yellow-star.png"}/>}</div>
                                                                    </span> */}
                                                                    <select className="form-control mb-3" name="rating" onChange={this.onChange}>
                                                                        <option value=''>Give rating</option>
                                                                        <option value='1'>1 Star</option>
                                                                        <option value='2'>2 Star</option>
                                                                        <option value='3'>3 Star</option>
                                                                        <option value='4'>4 Star</option>
                                                                        <option value='5'>5 Star</option>
                                                                    </select>
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
