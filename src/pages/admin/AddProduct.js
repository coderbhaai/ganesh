import React, { Component } from 'react'
import Sidebar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedVendor:         '',
            name:                   '',
            url:                    '',
            status:                 '',
            selectedCategory:       [],
            selectedTag:            [],
            shortDesc:              '',
            longDesc:               '',
            catOptions:             [],
            tagOptions:             [],
            vendorOptions:          [],
            price:                  '',
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
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    vendorSelected = (e, {value}) => { this.setState({ selectedVendor: value }) }
    removeTag =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
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
            tagOptions:               body.tagOptions,
            vendorOptions:            body.vendorOptions,
        })
    } 

    submitHandler = (e) =>{
        e.preventDefault()
        const data = new FormData()
        if(this.state.images){ for(const f of this.state.images){ data.append('images', f) } }
        data.append('vendor', this.state.selectedVendor)
        data.append('name', this.state.name)
        data.append('url', this.state.url.replace(/ /g,"-"))
        data.append('status', this.state.status)
        data.append('category', JSON.stringify(this.state.selectedCategory) )
        data.append('tags', JSON.stringify(this.state.selectedTag) )
        data.append('shortDesc', this.state.shortDesc) 
        data.append('longDesc', this.state.longDesc)
        data.append('price', this.state.price)
        axios.post('/admin/addProduct', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    localStorage.setItem( 'message', res.data.message )
                    window.location.href = '/adminProducts'
                }
            })
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
                                    <div className="col-sm-4">
                                        <label>Name of Product</label>
                                        <input className="form-control" type="text" placeholder="Name of Product" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images</label>
                                        <input className="form-control" type="file" multiple onChange={this.imagesAdd}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Display Status</label>
                                        <select className="form-control" required value={this.state.status} onChange={this.onChange} name="status">
                                            <option>Select Display</option>
                                            <option value="1">Show Product</option> 
                                            <option value="0">Hide Product</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 compare label-down mb-5">
                                        <label>Add Seller</label>
                                        <Dropdown placeholder='Select Tags' fluid search selection onChange={this.vendorSelected} options={this.state.vendorOptions}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>URL</label>
                                        <input className="form-control" type="text" placeholder="URL of Product" name="url" required value={this.state.url} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Price</label>
                                        <input className="form-control" type="text" placeholder="Price of Product" name="price" required value={this.state.price} onChange={this.onChange}/>
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
                                    <div className="col-sm-12 compare label-down my-5">
                                        <label>Categories</label>
                                        <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                    </div>
                                    <div className="col-sm-12 compare label-down mb-5">
                                        <label>Add Tags</label>
                                        <Dropdown placeholder='Select Tags' fluid search multiple selection onChange={this.tagSelected} options={this.state.tagOptions}/>
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