import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
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
            selectedVendor:         '',
            name:                   '',
            vendor:                 '',
            url:                    '',
            display:                '',
            selectedCategory:       [],
            selectedTag:            [],
            shortDesc:              '',
            longDesc:               '',
            catOptions:             [],
            tagOptions:             [],
            vendorOptions:          [],
            price:                  '',
            oldImages:              [],
            oldCategory:            [],
            oldTags:                 [],
            oldVendor:              '',
            loading:                true
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
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    vendorSelected = (e, {value}) => { this.setState({ selectedVendor: value }) }
    removeTag =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    removeCategory =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    arrayCategoryRemove(index){ this.state.oldCategory.splice(index, 1); this.setState({oldCategory: this.state.oldCategory}) }
    arrayTagRemove(index){ this.state.oldTags.splice(index, 1); this.setState({oldTags: this.state.oldTags}); }
    componentDidMount(){ 
        window.scrollTo(0, 0)
        const id = window.location.href.split("/").pop();
        this.setState({ id: id })
     }
     ckEditorReady=()=>{ this.callApi() }
     timeout=(delay)=>{ return new Promise( res => setTimeout(res, delay) ); }
    
    callApi = async () => {
        await this.timeout(2000);
        if(this.state.loading && this.state.id){
            this.setState({ loading: false })
            const response = await fetch('/admin/editProductData/'+this.state.id)
            const body = await response.json()
            if (response.status !== 200) throw Error(body.message)
            this.setState({
                selectedVendor:                 body.data.vendorId,
                name:                           body.data.name,
                url:                            body.data.url,
                price:                          body.data.price,
                oldVendor:                      body.data.vendor,
                shortDesc:                      body.data.shortDesc,
                longDesc:                       body.data.longDesc,
                display:                        body.data.display,
                catOptions:                     body.catOptions,
                tagOptions:                     body.tagOptions,
                vendorOptions:                  body.vendorOptions,
                oldCategory:                    body.catList,
                oldTags:                        body.tagList,
                oldImages:                      JSON.parse(body.data.images),
            })
        }
    }

    submitHandler = (e) =>{
        e.preventDefault()
        this.setState({clicked: true})
        const data = new FormData()
        const catList = []; this.state.oldCategory.forEach(i => { catList.push(i.value) });
        const tagList = []; this.state.oldTags.forEach(i => { tagList.push(i.value) });
        var finalCategory = Array.from(new Set( [...catList, ...this.state.selectedCategory]));
        var finalTag = Array.from(new Set( [...tagList, ...this.state.selectedTag]));

        if(this.state.images){ for(const f of this.state.images){ data.append('images', f) } }
        data.append('id', this.state.id)
        data.append('vendor', this.state.selectedVendor)
        data.append('name', this.state.name)
        data.append('url', this.state.url.replace(/ /g,"-"))
        data.append('display', this.state.display)
        data.append('category', JSON.stringify(finalCategory) )
        data.append('tags', JSON.stringify(finalTag) )
        data.append('shortDesc', this.state.shortDesc)
        data.append('longDesc', this.state.longDesc)
        data.append('price', this.state.price)
        data.append('oldImages', this.state.oldImages)
        axios.post('/admin/updateProduct', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    localStorage.setItem( 'message', res.data.message )
                    window.location.href = '/admin/adminProducts'
                }
            })
    }

    render() {
        console.log('this.state', this.state)
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Edit product)</h1>
                            <form className="modal-form" encType="multipart/form-data" onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Name of Product</label>
                                        <input className="form-control" type="text" placeholder="Name of Product" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images</label>
                                        <input className="form-control" type="file" multiple onChange={this.imagesAdd}/>
                                        {this.state.oldImages.map((i,index)=>(<img src={"/images/product/"+i} key={index} className="previewImg"/>))}
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Display Status</label>
                                        <select className="form-control" required value={this.state.display} onChange={this.onChange} name="display">
                                            <option>Select Display</option>
                                            <option value="1">Show Product</option> 
                                            <option value="0">Hide Product</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 compare label-down mb-5">
                                        <label>Add Seller</label>
                                        <Dropdown placeholder='Select Tags' fluid search selection onChange={this.vendorSelected} options={this.state.vendorOptions}/>
                                        <p><strong>Vendor:</strong> {this.state.oldVendor}</p>
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
                                            onInstanceReady={this.ckEditorReady()}
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            data ={this.state.shortDesc}
                                            shortDesc= {this.state.shortDesc}
                                            onChange={this.onEditorChange1}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Long Description</label>
                                        <CKEditor 
                                            onInstanceReady={this.ckEditorReady()}
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            data ={this.state.longDesc}
                                            longDesc= {this.state.longDesc}
                                            onChange={this.onEditorChange2}
                                        />
                                    </div>
                                    <div className="col-sm-12 compare label-down my-5">
                                        <div className="update-treat">
                                            { this.state.oldCategory.length ? 
                                                <>
                                                    { this.state.oldCategory.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayCategoryRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <label>Categories</label>
                                        <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                    </div>
                                    <div className="col-sm-12 compare label-down mb-5">
                                        <div className="update-treat">
                                            { this.state.oldTags.length ? 
                                                <>
                                                    { this.state.oldTags.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayTagRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
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

export default EditProduct