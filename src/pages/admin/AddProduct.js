import React, { Component } from 'react'
import Sidebar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
const func = require('../parts/functions')

export class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedVendor:         '',
            name:                   '',
            url:                    '',
            status:                 '',
            type:                   '',
            selectedCategory:       [],
            // selectedTag:            [],
            inclusions:            [],
            exclusions:            [],
            recom:                  [],
            related:                [],
            shortDesc:              '',
            longDesc:               '',
            catOptions:             [],
            // tagOptions:             [],
            vendorOptions:          [],
            incOptions:             [],
            productOptions:         [],
            price:                  '',
            sale:                   '',
            tagline:                ''
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
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    // tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    incSelected = (e, {value}) => { this.setState({ inclusions: value }) }
    excSelected = (e, {value}) => { this.setState({ exclusions: value }) }
    recomSelected = (e, {value}) => { this.setState({ recom: value }) }
    relatedSelected = (e, {value}) => { this.setState({ related: value }) }
    vendorSelected = (e, {value}) => { this.setState({ selectedVendor: value }) }
    // removeTag =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    removeCategory =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    componentDidMount(){
        this.callApi()
    }
    
    callApi = async () => {
        const response = await fetch('/admin/addProductOptions')
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            catOptions:               body.catOptions,
            // tagOptions:               body.tagOptions,
            vendorOptions:            body.vendorOptions,
            productOptions:           body.productOptions,
        })
        const options = []
        body.incOptions.map(i => { options.push({'text': i.text+'-'+i.tab1, 'value': i.value}) })
        this.setState({ incOptions:  options })
    } 

    submitHandler = (e) =>{
        e.preventDefault()
        if(parseInt(this.state.price) <= parseInt(this.state.sale)){
            func.callSwal("Sale Price has to be lower than Price")
        }else{
            const data = new FormData()
            if(this.state.images){ for(const f of this.state.images){ data.append('images', f) } }
            data.append('vendor', this.state.selectedVendor)
            data.append('name', this.state.name)
            data.append('type', this.state.type)
            data.append('url', this.state.url.replace(/ /g,"-"))
            data.append('status', this.state.status)
            data.append('category', JSON.stringify(this.state.selectedCategory) )
            data.append('inclusion', JSON.stringify(this.state.inclusions) )
            data.append('exclusion', JSON.stringify(this.state.exclusions) )
            data.append('recom', JSON.stringify(this.state.recom) )
            data.append('related', JSON.stringify(this.state.related) )
            data.append('shortDesc', this.state.shortDesc) 
            data.append('longDesc', this.state.longDesc)
            data.append('price', this.state.price)
            data.append('sale', this.state.sale)
            data.append('tagline', this.state.tagline)
            axios.post('/admin/addProduct', data)
                .catch(err=>{ func.printError(err) })
                .then(res=>{
                    if(res.data.success){
                        localStorage.setItem( 'message', res.data.message )
                        window.location.href = '/admin/adminProducts'
                    }
                })
        }
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row admin">
                        <Sidebar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Add Product)</h1>
                            <form className="modal-form" encType="multipart/form-data" onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Name of Product</label>
                                        <input className="form-control" type="text" placeholder="Name of Product" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>URL</label>
                                        <input className="form-control" type="text" placeholder="URL of Product" name="url" required value={this.state.url} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4 compare label-down">
                                        <label>Add Seller</label>
                                        <Dropdown placeholder='Select Tags' fluid search selection onChange={this.vendorSelected} options={this.state.vendorOptions}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images (650px X 750px)</label>
                                        <input className="form-control" type="file" multiple onChange={this.imagesAdd}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Display Status</label>
                                        <select className="form-control" required value={this.state.status} onChange={this.onChange} name="status">
                                            <option value=''>Select Display</option>
                                            <option value="1">Show Product</option> 
                                            <option value="0">Hide Product</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Price</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Price of Product" name="price" required value={this.state.price} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Sale Price</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Sale Price" name="sale" value={this.state.sale} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Type of Product</label>
                                        <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                            <option value=''>Select Type</option>
                                            <option value="1">Organize Puja</option> 
                                            <option value="2">Astro Consultation</option>
                                            <option value="3">Puja Samagri</option>
                                            <option value="4">Home Decor</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Tagline</label>
                                        <input className="form-control" type="text" placeholder="Product Tagline" name="tagline" value={this.state.tagline || ''} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Short Description</label>
                                        <CKEditor 
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            shortDesc= {this.state.shortDesc}
                                            onChange={this.onEditorChange1}
                                            config={ { allowedContent : true, extraAllowedContent: "span; *(*); div(col-sm-*, container-fluid, container, row)" } }
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Long Description</label>
                                        <CKEditor 
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            longDesc= {this.state.longDesc}
                                            onChange={this.onEditorChange2}
                                            config={ { allowedContent : true, extraAllowedContent: "span; *(*); div(col-sm-*, container-fluid, container, row)" } }
                                        />
                                    </div>
                                    <div className="col-sm-12 compare label-down mt-5">
                                        <label>Categories</label>
                                        <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                    </div>
                                    {/* <div className="col-sm-6 compare label-down mt-5">
                                        <label>Add Tags</label>
                                        <Dropdown placeholder='Select Tags' fluid search multiple selection onChange={this.tagSelected} options={this.state.tagOptions}/>
                                    </div> */}
                                    <div className="col-sm-6 compare label-down my-5">
                                        <label>Puja Inclusion</label>
                                        <Dropdown placeholder='Select Puja Inclusion' fluid search multiple selection onChange={this.incSelected} options={this.state.incOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down my-5">
                                        <label>Puja Exclusion</label>
                                        <Dropdown placeholder='Select Puja Exclusion' fluid search multiple selection onChange={this.excSelected} options={this.state.incOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down mb-5">
                                        <label>Recommended Products</label>
                                        <Dropdown placeholder='Select Recommended Products' fluid search multiple selection onChange={this.recomSelected} options={this.state.productOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down mb-5">
                                        <label>Related Products</label>
                                        <Dropdown placeholder='Select Related Products' fluid search multiple selection onChange={this.relatedSelected} options={this.state.productOptions}/>
                                    </div>
                                    <div className="my-div col-sm-12">
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

export default AddProduct