import React, { Component } from 'react'
import Sidebar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'

export class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:                     '',
            vendor:                 '',
            name:                   '',
            shortDesc:              '',
            longDesc:               '',
            catOptions:             [],
            subCatOptions:          [],
            tagOptions:             [],
            category:               '',
            subCategory:            '',
            sku:                    [],
            display:                '',
            oldImages:              [],
            oldCategory:            '',
            oldSubCategory:         '',
            oldCategoryURL:         '',
            oldSubCategoryURL:      '',
            tags:                   []
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
		this.onEditorChange2 = this.onEditorChange2.bind( this )
    }

    onEditorChange1( evt1 ) { this.setState( { shortDesc: evt1.editor.getData() } ) }
	onEditorChange2( evt2 ) { this.setState( { longDesc: evt2.editor.getData() } ) }
	handleChange1( changeEvent1 ) { this.setState( { shortDesc: changeEvent1.target.value } ) }
	handleChange2( changeEvent2 ) { this.setState( { longDesc: changeEvent2.target.value } ) }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }
    componentDidMount(){
        if(typeof(Storage) !== "undefined"){ this.setState({ vendor: JSON.parse(localStorage.getItem('ECuser')).id || [] }) }
        this.callApi(JSON.parse(localStorage.getItem('ECuser')).id)
    }
    
    callApi = async (user) => {
        const id = window.location.href.split("/").pop()
        const response = await fetch('/admin/editProductData/'+user+'/'+id)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            id:                             window.location.href.split("/").pop(),
            name:                           body.data.product,
            shortDesc:                      body.data.shortDesc,
            longDesc:                       body.data.longDesc,
            sku:                            JSON.parse(body.data.sku),
            display:                        body.data.display,
            catOptions:                     body.catOptions,
            tagOptions:                     body.tagOptions,
            oldCategory:                    body.data.categoryName,
            oldSubCategory:                 body.data.subcategoryName,
            oldImages:                      JSON.parse(body.data.images),
            oldCategoryURL:                 body.data.category,
            oldSubCategoryURL:              body.data.subcategory,
            tags:                           JSON.parse(body.data.tags)
        })
    }
    
    categorySelected = (e, {value}) => { 
        this.setState({ category: value }) 
        this.catSelected(value)
    }

    catSelected = async (cat) => {
        const response = await fetch('/admin/subCatOptions/'+cat)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            subCatOptions:               body.subCatOptions,
        })
    }

    subCategorySelected = (e, {value}) => { this.setState({ subCategory: value }) }

    addSKU(e){
        this.setState({sku: [...this.state.sku, ["", "", "", "", ""] ] })
    }

    skuChange(e, i, index){
        this.state.sku[index][i] = e.target.value
        this.setState({sku: this.state.sku})
    }

    removeSKU(index){
        this.state.sku.splice(index, 1)
        this.setState({sku: this.state.sku})
    }

    addTags = (e, {value}) => {
        var tags = this.state.tags
        if(this.state.tags.length<5){
            for(var i = 0; i < value.length; i++){
                if(!tags.includes(value[i])){
                    tags.push(value[i])
                    this.setState({ tags : tags })
                }else{
                    this.callSwal("Tag already added")
                }
            }
        }else{
            this.callSwal("Only 5 tags allowed in a product")
        }
    }

    removeTag =(i, index)=>{
        this.state.tags.splice(index, 1)
        this.setState({tags: this.state.tags})
    }

    submitHandler = (e) =>{
        e.preventDefault()
        this.setState({clicked: true})
        var prices = []
        this.state.sku.forEach(i => { prices.push(i[1]) })
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        const data = new FormData()
        if(this.state.images){ for(const f of this.state.images){ data.append('images', f) } }
        if(this.state.categry){ data.append('category', this.state.category) }else{data.append('category', this.state.oldCategoryURL)}
        if(this.state.subCategry){ data.append('subCategory', this.state.subCategory) }else{ data.append('subCategory', this.state.oldSubCategoryURL) }
        data.append('id', this.state.id)
        data.append('name', this.state.name)
        data.append('oldImages', JSON.stringify( this.state.oldImages ) )
        data.append('shortDesc', this.state.shortDesc) 
        data.append('longDesc', this.state.longDesc)
        data.append('display', this.state.display)
        data.append('minPrice', minPrice)
        data.append('maxPrice', maxPrice)
        data.append('sku', JSON.stringify( this.state.sku ) )
        data.append('tags', JSON.stringify( this.state.tags ) )
        axios.post('/admin/updateProduct', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    localStorage.setItem( 'ECmessage', res.data.message )
                    window.location.href = '/seller'
                }
            })
    }

    render() {
        const renderTags = this.state.tagOptions.filter((o) =>{if(this.state.tags.includes( o.value )) return o;  }  ).map((i, index)=>{ return (
            <div key={index}><a href={"/tag/"+i.value}>{i.text}</a><img src="/images/icons/wrong.svg" onClick={()=>this.removeTag(i, index)}/></div>
        )})
        return (
            <>
                <Header/>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Seller Panel </span>(Edit product)</h1>
                    <div className="row admin">
                        <Sidebar/>
                        <div className="col-sm-10">
                            <form className="modal-form" encType="multipart/form-data" onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Name of Product</label>
                                        <input className="form-control" type="text" placeholder="Name of Product" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Categories</label>
                                        <Dropdown placeholder='Select category' fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                        {this.state.category ? <p><strong>Category changed to:</strong> {this.state.category}</p> : null }
                                        <p><strong>Present category:</strong> {this.state.oldCategory}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Sub Categories</label>
                                        <Dropdown placeholder='Select Sub Category' fluid search selection onChange={this.subCategorySelected} options={this.state.subCatOptions}/>
                                        {this.state.subCategory ? <p><strong>Sub Category changed to:</strong> {this.state.subCategory}</p> : null }
                                        <p><strong>Present Sub Category:</strong> {this.state.oldSubCategory}</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Images</label>
                                        <input className="form-control" type="file" multiple onChange={this.imagesAdd}/>
                                        <div className="editImgDisplay">
                                            {this.state.oldImages.map((i,index)=>(
                                                <img src={"/images/products/"+this.state.oldImages[index]} key={index}/>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Display Status</label>
                                        <select className="form-control" required value={this.state.display} onChange={this.onChange} name="display">
                                            <option>Select Display</option>
                                            <option value="1">Show Product</option> 
                                            <option value="0">Hide Product</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-12 compare tags">
                                        <label>Add Tags</label>
                                        {this.state.tags.length<5?
                                            <Dropdown placeholder='Select Tags' fluid search multiple selection onChange={this.addTags} options={this.state.tagOptions}/>
                                        :null}
                                        <div className="tagsSelected my-3">
                                            {renderTags}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Short Description</label>
                                        <CKEditor 
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            data ={this.state.shortDesc}
                                            shortDesc= {this.state.shortDesc}
                                            onChange={this.onEditorChange1}
                                            config={ { allowedContent : true, extraAllowedContent: "span; *(*); div(col-sm-*, container-fluid, container, row)" } }
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Long Description</label>
                                        <CKEditor 
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            data ={this.state.longDesc}
                                            longDesc= {this.state.longDesc}
                                            onChange={this.onEditorChange2}
                                            config={ { allowedContent : true, extraAllowedContent: "span; *(*); div(col-sm-*, container-fluid, container, row)" } }
                                        />
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Click to add details</label>
                                        <button className="amitBtn" onClick={(e)=>this.addSKU(e)}>Add SKU</button>
                                    </div>
                                    <div className="col-sm-12">
                                        { this.state.sku.map((i, index) =>{ return(  
                                            <div className="row" key={index} id="addHiddenBox">
                                                <div className="col-sm-2">
                                                    <label>Quantity</label>
                                                    <input className="form-control"  type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } placeholder="Add Quantity" value={i[0]} required onChange={(e)=>this.skuChange(e, 0, index)}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <label>Price (Amount in &#8377;)</label>
                                                    <input className="form-control"  type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } placeholder="Add Price" required value={i[1]} onChange={(e)=>this.skuChange(e, 1, index)}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <label>stock</label>
                                                    <select className="form-control" required value={i[2]} onChange={(e)=>this.skuChange(e, 2, index)}>
                                                        <option>Stock Availability </option>
                                                        <option value="1">In Stock</option> 
                                                        <option value="0">Out of Stock</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-3">
                                                    <label>Discount (Amount in &#8377;)</label>
                                                    <input className="form-control"  type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } placeholder="Add Price" required value={i[3]} onChange={(e)=>this.skuChange(e, 3, index)}/>
                                                </div>
                                                <div className="col-sm-3">
                                                    <label>SKU</label>
                                                    <div className="form-group">
                                                        <input className="form-control" type="text" placeholder="Enter SKU"  required value={i[4]} onChange={(e)=>this.skuChange(e, 4, index)}/>
                                                        <button className="btn btn-danger removeText flex-h" type="button" onClick={()=>this.removeSKU(index)}><img src="/images/icons/wrong-white.svg" alt="Travel guide to India"/></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                    <div className="my-btn">
                                        <button className="amitBtn" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default EditProduct