import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
const func = require('../parts/functions')

export class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:                     '',
            selectedVendor:         '',
            name:                   '',
            type:                   '',
            vendor:                 '',
            url:                    '',
            status:                '',
            selectedCategory:       [],
            // selectedTag:            [],
            inclusions:             [],
            exclusions:             [],
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
            oldImages:              [],
            oldCategory:            [],
            // oldTags:                [],
            oldInc:                 [],
            oldExc:                 [],
            oldRecom:               [],
            oldRelated:             [],
            oldVendor:              '',
            loading:                true,
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
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    // tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    incSelected = (e, {value}) => { this.setState({ inclusions: value }) }
    excSelected = (e, {value}) => { this.setState({ exclusions: value }) }
    recomSelected = (e, {value}) => { this.setState({ recom: value }) }
    relatedSelected = (e, {value}) => { this.setState({ related: value }) }
    incSelected = (e, {value}) => { this.setState({ inclusions: value }) }
    vendorSelected = (e, {value}) => { this.setState({ selectedVendor: value }) }
    // removeTag =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    removeCategory =(i, index)=>{ this.state.tags.splice(index, 1); this.setState({tags: this.state.tags}) }
    arrayCategoryRemove(index){ this.state.oldCategory.splice(index, 1); this.setState({oldCategory: this.state.oldCategory}) }
    // arrayTagRemove(index){ this.state.oldTags.splice(index, 1); this.setState({oldTags: this.state.oldTags}); }
    arrayIncRemove(index){ this.state.oldInc.splice(index, 1); this.setState({oldInc: this.state.oldInc}); }
    arrayExcRemove(index){ this.state.oldExc.splice(index, 1); this.setState({oldExc: this.state.oldExc}); }
    arrayRelatedRemove(index){ this.state.oldRelated.splice(index, 1); this.setState({oldRelated: this.state.oldRelated}); }
    arrayRecomRemove(index){ this.state.oldRecom.splice(index, 1); this.setState({oldRecom: this.state.oldRecom}); }
    
    
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
                type:                           body.data.type,
                url:                            body.data.url,
                price:                          body.data.price,
                sale:                           body.data.sale,
                oldVendor:                      body.data.vendorName,
                shortDesc:                      body.data.shortDesc,
                longDesc:                       body.data.longDesc,
                status:                         body.data.status,
                catOptions:                     body.catOptions,
                // tagOptions:                     body.tagOptions,
                vendorOptions:                  body.vendorOptions,
                productOptions:                 body.productOptions,
                oldCategory:                    body.catList,
                // oldTags:                        body.tagList,
                oldInc:                         body.incList,
                oldExc:                         body.excList,
                oldRecom:                       body.recomList,
                oldRelated:                     body.relatedList,
                oldImages:                      JSON.parse(body.data.images),
                tagline:                        body.tagline,
            })
            const incOptions = [];
            body.incOptions.map(i => { incOptions.push({'text': i.text+'-'+i.tab1, 'value': i.value}) })
            this.setState({ 
                incOptions:             incOptions
            })
        }
    }

    submitHandler = (e) =>{
        e.preventDefault()
        this.setState({clicked: true})
        if(parseInt(this.state.price) <= parseInt(this.state.sale)){
            func.callSwal("Sale Price has to be lower than Price")
        }else{
            const data = new FormData()
            const aa = []; this.state.oldCategory.forEach(i => { aa.push(i.value) }); var finalCategory = Array.from(new Set( [...aa, ...this.state.selectedCategory]));
            // const bb = []; this.state.oldTags.forEach(i => { bb.push(i.value) }); var finalTag = Array.from(new Set( [...bb, ...this.state.selectedTag]));
            const cc = []; this.state.oldInc.forEach(i => { cc.push(i.value) }); var finalInc = Array.from(new Set( [...cc, ...this.state.inclusions]));
            const dd = []; this.state.oldExc.forEach(i => { dd.push(i.value) }); var finalExc = Array.from(new Set( [...dd, ...this.state.exclusions]));
            const ee = []; this.state.oldRecom.forEach(i => { ee.push(i.value) }); var finalRecom = Array.from(new Set( [...ee, ...this.state.recom]));
            const ff = []; this.state.oldRelated.forEach(i => { ff.push(i.value) }); var finalRelated = Array.from(new Set( [...ff, ...this.state.related]));

            if(this.state.images){ for(const f of this.state.images){ data.append('images', f) } }
            data.append('id', this.state.id)
            data.append('vendor', this.state.selectedVendor)
            data.append('name', this.state.name)
            data.append('type', this.state.type)
            data.append('url', this.state.url.replace(/ /g,"-"))
            data.append('status', this.state.status)
            data.append('category', JSON.stringify(finalCategory) )
            // data.append('tags', JSON.stringify(finalTag) )
            data.append('inclusion', JSON.stringify(finalInc) )
            data.append('exclusion', JSON.stringify(finalExc) )
            data.append('recom', JSON.stringify(finalRecom) )
            data.append('related', JSON.stringify(finalRelated) )
            data.append('shortDesc', this.state.shortDesc)
            data.append('longDesc', this.state.longDesc)
            data.append('price', this.state.price)
            data.append('sale', this.state.sale)
            data.append('tagline', this.state.tagline)
            data.append('oldImages', JSON.stringify( this.state.oldImages ))
            axios.post('/admin/updateProduct', data)
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
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Edit product)</h1>
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
                                        <p><strong>Vendor:</strong> {this.state.oldVendor}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images (650px X 750px)</label>
                                        <input className="form-control" type="file" multiple onChange={this.imagesAdd}/>
                                        {this.state.oldImages.map((i,index)=>(<img src={"/images/product/"+i} key={index} className="previewImg"/>))}
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
                                        <label>Type of Product</label>
                                        <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                            <option value=''>Select Type</option>
                                            <option value="1">Organize Puja</option> 
                                            <option value="2">Astro Consultation</option>
                                            <option value="3">Puja Samagri</option>
                                            <option value="4">Home Decor</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Price</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Price of Product" name="price" required value={this.state.price} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Sale Price</label>
                                        <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Sale Price" name="sale" value={this.state.sale || ''} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Tagline</label>
                                        <input className="form-control" type="text" placeholder="Product Tagline" name="tagline" value={this.state.tagline || ''} onChange={this.onChange}/>
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
                                    <div className="col-sm-12 compare label-down mt-5">
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
                                    {/* <div className="col-sm-6 compare label-down mt-5">
                                        <div className="update-treat">
                                            { this.state.oldTags.length ? 
                                                <>
                                                    { this.state.oldTags.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayTagRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <label>Add Tags</label>
                                        <Dropdown placeholder='Select Tags' fluid search multiple selection onChange={this.tagSelected} options={this.state.tagOptions}/>
                                    </div> */}
                                    <div className="col-sm-6 compare label-down my-5">
                                        <div className="update-treat">
                                            { this.state.oldInc.length ? 
                                                <>
                                                    { this.state.oldInc.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayIncRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <label>Puja Inclusion</label>
                                        <Dropdown placeholder='Select Puja Inclusion' fluid search multiple selection onChange={this.incSelected} options={this.state.incOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down my-5">
                                        <div className="update-treat">
                                            { this.state.oldExc.length ? 
                                                <>
                                                    { this.state.oldExc.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayExcRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <label>Puja Exclusion</label>
                                        <Dropdown placeholder='Select Puja Exclusion' fluid search multiple selection onChange={this.excSelected} options={this.state.incOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down my-5">
                                        <div className="update-treat">
                                            { this.state.oldRecom.length ? 
                                                <>
                                                    { this.state.oldRecom.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayRecomRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <label>Recommended Products</label>
                                        <Dropdown placeholder='Select Recommended Products' fluid search multiple selection onChange={this.recomSelected} options={this.state.productOptions}/>
                                    </div>
                                    <div className="col-sm-6 compare label-down my-5">
                                        <div className="update-treat">
                                            { this.state.oldRelated.length ? 
                                                <>
                                                    { this.state.oldRelated.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayRelatedRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
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

export default EditProduct