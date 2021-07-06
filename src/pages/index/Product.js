import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import ReactImageMagnify from 'react-image-magnify';
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
// import swal from 'sweetalert'
import StarRating from '../parts/StarRating'
import ProductShare from '../parts/ProductShare'
import moment from "moment"
// import BlogCarousel from '../blog/BlogCarousel'
const func = require('../parts/functions')
import {Modal, ModalHeader, ModalBody } from 'reactstrap'

export class Product extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:                   [],
            product:                this.props.product,
            incList:                this.props.incList,
            excList:                this.props.excList,
            catProducts:            [],
            currentImg:             this.props.currentImg,
            topProducts:            [],
            relatedProducts:        [],
            finalRating:            [],
            reviews:                [],
            recomList:              [],
            relatedList:            this.props.relatedList,
            rating:                 0,
            review:                 '',
            reviewId:               '',
            oldRating:              '',
            allowReview:            false,
            reviewSubmitted:        false,
            isSeller:               false,
            // blogs:                  this.props.blogs,
            addmodalIsOpen:         false,
            prodName:               '',
            prodUrl:                '',
            prodId:                 '',
            name:                   '',
            email:                  '',
            phone:                  '',
            question:               '',
            images:                 [],
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    onEditorChange1( evt1 ) { this.setState( { review: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { review: changeEvent1.target.value } ) }
    changeImg=(i)=>{ this.setState({ currentImg: i }) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }
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
    
    cartFieldChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.addFormField() ) }

    addFormField=()=>{
        if( this.state.cart.some( j => j[1] === parseInt(this.state.product.id) )){
            this.state.cart.forEach((o)=>{
                if( o[1] === parseInt(this.state.product.id) ){ 
                    o[7] = this.state.date,
                    o[8] = this.state.place
                }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('cart', JSON.stringify(this.state.cart)))
        }
    }

    callApi = async (url) => {
        const response = await fetch( '/admin/fetchproduct/'+url ); 
        const body = await response.json()
        this.setState({
            id:                     body.product.id,
            product:                body.product,
            finalRating:            JSON.parse( body.product.rating ),
            incList:                body.incList,
            excList:                body.excList,
            catProducts:            body.catProducts,
            currentImg:             JSON.parse( body.product.images )[0],
            reviews:                body.reviewList,
            recomList:              body.recomList,
            relatedList:            body.relatedList,
        },()=> this.checkForReview( body.product.id ))
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
        }
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
                .catch(err=>{ func.printError(err) })
                .then(res=>{
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
                .catch(err=>{ func.printError(err) })
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
        this.setState({ rating: value})
    }

    resetData = ()=>{ 
        this.setState({ 
            addmodalIsOpen:             false,
            prodName:                   '',
            prodUrl:                    '',
            prodId:                     '',
            name:                       '',
            email:                      '',
            phone:                      '',
            question:                   '',
        })
        window.scrollTo(0, 0)
    }

    askQuestion = (e) => {
        e.preventDefault()
        const data={
            prodName:           this.state.product.name,
            prodUrl:            this.state.product.url,
            name:               this.state.name,
            email:              this.state.email,
            phone:              this.state.phone,
            question:           this.state.question,
            prodId:             this.state.prodId,
        }
        axios.post('/askQuestion', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{ func.callSwal(res.data.message) })
        this.resetData()
    }

    render() {
        if(this.state.incList){
            var count = Math.round( this.state.incList.length/3 )
        }else{
            count = 4
        }
        return (
            <> 
                <Header cart={this.state.cart.length}/>
                { this.state.product ?<section>
                    <div className="container singleProduct">
                        <div className="row mt-5 py-3 product">
                            <div className="col-sm-3 mb-5 imgZoom">
                                { this.state.product.images && this.state.currentImg ?
                                    <>
                                        <div className="thumbnail web">
                                            {JSON.parse(this.state.product.images).map((i, index)=>( <img key={index} src={"/images/product/"+i} onClick={()=>this.changeImg(i)} alt={i.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')}/>))}
                                        </div>
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: this.state.currentImg.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' '),
                                                isFluidWidth: true,
                                                src: '/images/product/'+this.state.currentImg
                                            },
                                            largeImage: {
                                                src: '/images/product/'+this.state.currentImg,
                                                width: 600,
                                                height: 900
                                            }
                                        }} />
                                        {this.state.product.type !==1 ?
                                            <div className="changeQty flex-sb">
                                                <div>
                                                    <label>Quantity</label>
                                                    <ul>
                                                        <li onClick={()=>this.removeFromCart(this.state.product)}>-</li>
                                                        <li>{this.state.cart.filter(i=>i[1]==this.state.product.id).length ? this.state.cart.filter(i=>i[1]==this.state.product.id)[0][0] : 0 }</li>
                                                        <li onClick={()=>this.addToCart(this.state.product)}>+</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        : null}
                                        <button className="amitBtn" onClick={()=>this.addToCart(this.state.product)}>Add To Cart</button>
                                    </>
                                : null}
                            </div>
                            <div className="col-sm-6">
                                {this.state.product.rating? <StarRating rating={JSON.parse( this.state.product.rating)[0]}/> : null }
                                <h1>{this.state.product.name}</h1>
                                <p>
                                    <span className={this.state.product.sale ? "price strike" : "price"}>
                                        <span className="rs">&#8377; </span>{this.state.product.price+' /-'}
                                    </span>
                                    {this.state.product.sale ? <span className="price"><span className="rs">&#8377; </span>{this.state.product.sale +' /-'}</span> : null }
                                </p>
                                <div className="not-found-controller mb-5" dangerouslySetInnerHTML={{ __html: this.state.product.shortDesc }}/>
                                {this.state.product.type==1 && this.state.cart.some(x => x[1] === this.state.product.id) ?
                                <>
                                    <label>Desire date * (Please book 48 Hours in Advance)</label>
                                    <input className="form-control" type="date" placeholder="Desire date of Puja" onChange={this.cartFieldChange} name="date" value={this.state.date || ''}/>
                                    <label>Place *</label>
                                    <input className="form-control" type="text" placeholder="Place of Puja" onChange={this.cartFieldChange} name="place" value={this.state.puja}/>
                                </>
                                : null
                                }
                                <div className="changeQty flex-sb mt-5">
                                    <div>
                                        <label>Share With</label>
                                        <ProductShare title={this.state.product.name} url={"https://pujarambh.com/product/"+this.state.product.url} media={"https://pujarambh.com/images/product/"+this.state.currentImg}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                {this.state.relatedList && this.state.relatedList.length?
                                    <div className="bg-white sideProducts" style={{padding:'10px'}}>
                                        <p className="text-center">Related Products</p>
                                        <hr style={{margin: '0 0 7px'}}/>
                                        {this.state.relatedList.map((i, index)=>(
                                            <div className="flex-sb mb-3" key={index}>
                                                <a href={"/product/"+i.url}>
                                                    <img key={index} src={"/images/product/"+JSON.parse(i.images)[0]} alt={JSON.parse(i.images)[0].replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')}/>
                                                    <div className=" w-100" style={{paddingLeft:'5px'}}>
                                                        <div className="text-center">
                                                            {i.rating? <StarRating rating={JSON.parse( i.rating)[0]}/> : null }
                                                        </div>
                                                        <p style={{fontWeight:'600'}}>{i.text}</p>
                                                        <p>
                                                            <span className={i.sale ? "price strike" : "price"}>
                                                                <span className="rs">&#8377; </span>{i.price + ' /-'}
                                                            </span>
                                                            {i.sale ? <span className="price"><span className="rs">&#8377; </span>{i.sale + ' /-'}</span> : null }
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                : null}
                            </div>
                        </div>
                    </div>
                    <div className="container extraProducts">
                        {this.state.incList || this.state.excList?
                            <div className="row inclusions">
                                {this.state.incList && this.state.incList.length>0 ?
                                    <div className="col-sm-9">
                                        { this.state.product ? <h2>{this.state.product.name} Includes</h2> : null}
                                        <div className="row">
                                            <div className="col-sm-3"><ul>{this.state.incList.slice(0, count).map((i,index)=>( <li key={index}>{i.text +' - '+ i.tab1}</li>))}</ul></div>
                                            <div className="col-sm-3"><ul>{this.state.incList.slice(count, count*2).map((i,index)=>( <li key={index}>{i.text+' - '+ i.tab1}</li>))}</ul></div>
                                            <div className="col-sm-3"><ul>{this.state.incList.slice(count*2, count*3).map((i,index)=>( <li key={index}>{i.text+' - '+ i.tab1}</li>))}</ul></div>
                                            <div className="col-sm-3"><ul>{this.state.incList.slice(count*3, this.state.incList.length).map((i,index)=>( <li key={index}>{i.text+' - '+ i.tab1}</li>))}</ul></div>
                                        </div>
                                    </div>
                                : null}
                                {this.state.excList && this.state.excList.length>0 ?
                                    <div className="col-sm-3">
                                        <h2>Client needs to arrange</h2>
                                        <ul>{this.state.excList.map((i,index)=>( <li key={index}>{i.text+' - '+ i.tab1}</li>))}</ul>
                                    </div>
                                : null}
                            </div>
                        : null}
                        <div className="row">
                            <div className="col-sm-12 relatedProducts p-0">
                                <div className="box">
                                    <div className="bg-white reviewsDesc row">
                                        <div className="col-sm-12">
                                            <ul className="nav nav-tabs flex-h">
                                                <li><a className="active" data-toggle="tab" href="#home">Description</a></li>
                                                {this.state.reviews.length? <li><a data-toggle="tab" href="#menu1">Reviews</a></li> : null}
                                                { 
                                                    this.state.reviewSubmitted ? <li><a data-toggle="tab" href="#menu2">Update your Review</a></li>
                                                    : this.state.allowReview ? <li><a data-toggle="tab" href="#menu2">Submit a Review</a></li>
                                                    : null
                                                }
                                            </ul>
                                            <div className="tab-content">
                                                <div id="home" className="tab-pane fade in active show">
                                                    <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>{this.state.product.name}</span></h3>
                                                    <div className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.product.longDesc }} />
                                                </div>
                                                <div id="menu1" className="tab-pane fade">
                                                    {this.state.reviews.map((i, index)=>(
                                                        <div key={index} className="mb-3">
                                                            <div className="not-found-controller" dangerouslySetInnerHTML={{ __html: i.review }}/>
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
                                                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.review} review= {this.state.review} onChange={this.onEditorChange1}/>
                                                                </div>
                                                            </div>
                                                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                                        </form>
                                                    : this.state.allowReview && !this.state.isSeller ?
                                                        <form encType="multipart/form-data" onSubmit={this.addReview}>
                                                            <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>Submit a review</span></h3>
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <label>Rating</label>
                                                                    <div className="star-rating m-0">
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
                                                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } review= {this.state.review} onChange={this.onEditorChange1}/>
                                                                </div>
                                                            </div>
                                                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                                        </form>
                                                    :
                                                        <h3 className="heading" style={{textAlign:'left', marginBottom:'0'}}><span>Please login to submit a review</span></h3>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>: null }
                <div className="mt-5 doubtShield">
                    <div className="container">
                        <h3>Have Doubts regarding this product?</h3>
                        <button className="amitBtn" onClick={this.addModalOn}>Post Your Question</button>
                    </div>
                    <div className="container">
                        <img src="/images/icons/shield.svg" alt="Authentic puja products"/>
                        <p>Safe and secure payments. Easy returns. 100% authentic products.</p>
                    </div>
                </div>
                {/* <BlogCarousel blogs={this.state.blogs}/> */}
                <Footer/>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Ask Question </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form encType="multipart/form-data" onSubmit={this.askQuestion}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Name</label>
                                    <input name="name" type="text" className="form-control" placeholder="Name" value={this.state.name} required onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Email</label>
                                    <input name="email" type="email" className="form-control" placeholder="Email" value={this.state.email} required onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Phone</label>
                                    <input name="phone" type="tel" className="form-control" placeholder="Phone" value={this.state.phone} required onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12">
                                    <label>Question</label>
                                    <input name="question" type="text" className="form-control" placeholder="question" value={this.state.question} required onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="my-div">
                                <button className="amitBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Product
