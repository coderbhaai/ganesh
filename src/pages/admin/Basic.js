import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
const func = require('../parts/functions')
import axios from 'axios'

export class Basic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                       [],
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            type:                       '',
            name:                       '',
            tab1:                       '',
            tab2:                       '',
            image:                      null,
            oldImage:                   '',
            selectedId:                 '',
            search:                     '',
            currentPage:                1,
            itemsPerPage:               100,
            loading:                    true,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }
    uploadImage = (e) =>{ this.setState({ image: e.target.files[0] })}

    callApi = async () => {
        const response = await fetch( '/admin/adminBasic' )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            data:                   body.data,
            loading:                false,
        })
    }

    resetData = ()=>{ 
        this.setState({ 
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            type:                       '',
            name:                       '',
            image:                      null,
            oldImage:                   '',
            tab1:                       '',
            tab2:                       '',
            selectedId:                 '',
        })
        window.scrollTo(0, 0)
    }

    addBasic = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', this.state.name)
        data.append('type', this.state.type)
        data.append('tab2', this.state.tab2)
        if(this.state.type=='Category'){
            data.append('tab1', this.state.tab1.replace(/ /g,"-").toLowerCase())
        }else{
            data.append('tab1', this.state.tab1)
        }
        data.append('image', this.state.image)
        axios.post('/admin/addBasic', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){
                    this.setState({ data: [...this.state.data, res.data.data ] })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            type:                       i.type,
            name:                       i.name,
            tab1:                       i.tab1,
            tab2:                       i.tab2,
            oldImage:                   i.name,
            selectedId:                 i.id  
        })
        if(i.type=='Category'){
            this.setState({
                oldImage:                   i.tab2
            })
        }
    }

    updateBasic = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('id', this.state.selectedId)
        data.append('name', this.state.name)
        data.append('type', this.state.type)
        data.append('tab2', this.state.tab2)
        if(this.state.type=='Category'){
            data.append('tab1', this.state.tab1.replace(/ /g,"-").toLowerCase())
        }else{
            data.append('tab1', this.state.tab1)
        }
        data.append('image', this.state.image)
        data.append('oldImage', this.state.oldImage)
        axios.post('/admin/updateBasic', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){
                    this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    deleteProductCategory = ()=>{
        const id = this.state.selectedId
        const data ={
            id:         this.state.selectedId
        }
        axios.post('/admin/deleteProductCategory', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){
                    var check = this.state.data.filter(i=>i.id != id)
                    this.setState({ data: check })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }
    
    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else if(i.type.toLowerCase().includes(this.state.search.toLowerCase()) || i.name.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.type == 'CouponType' ? 'Coupon Type' : i.type}</td>
                    <td>{i.type=='Carousel' ? <img src={"/images/basic/"+i.name} className="preview"/> : i.name}</td>
                    <td>
                        {i.type == 'Category'?
                            <a href={"/product-category/"+i.tab1} target="_blank">{i.tab1}</a>
                        : i.tab1}
                    </td>
                    <td>
                        {i.type == 'Category'?
                            <img src={"/images/category/"+i.tab2} className="previewImg"/>
                        : i.tab2}
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}/></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row">
                    <AdminBar/>
                        <div className="col-sm-10">
                            <h2 className="heading">Admin ( Basic )</h2>
                            <div className="btn-pag">
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Basic</button>
                                    <div>
                                        <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)}/>
                                        <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                            <option>{itemsPerPage}</option>
                                            <option value="10">10</option> 
                                            <option value="25">25</option> 
                                            <option value="50">50</option> 
                                            <option value="100">100</option> 
                                        </select>
                                        <div><ul className="page-numbers">{renderPagination}</ul></div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Sl no.</td>
                                        <td>Type</td>
                                        <td>Name</td>
                                        <td>Tab1</td>
                                        <td>Tab2</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="4" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                            </table>
                            <ul className="page-numbers mb-5">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Footer/>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Add Basic Here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form encType="multipart/form-data" onSubmit={this.addBasic}>
                            <div className="row">
                                <div className={this.state.type? "col-sm-4" : "col-sm-12"}>
                                    <label>Type of Basic</label>
                                    <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                        <option value=''>Select Type</option>
                                        <option value="Category">Product Category</option>
                                        <option value="Vendor">Add Vendor</option>
                                        <option value="Puja">Puja Items</option>
                                    </select>
                                </div>
                                {this.state.type==='Category'? 
                                    <>
                                        <div className="col-sm-8">
                                            <label>Product Category</label>
                                            <input name="name" type="text" className="form-control" placeholder="Product Category" value={this.state.name} required onChange={this.onChange}/>
                                        </div> 
                                        <div className="col-sm-4">
                                            <label>Category Image (450px X 250px)</label>
                                            <input className="form-control" type="file" onChange={this.uploadImage}/>
                                        </div>
                                        <div className="col-sm-8">
                                            <label>URL</label>
                                            <input name="tab1" type="text" className="form-control" placeholder="URL" value={this.state.tab1} required onChange={this.onChange}/>
                                        </div>
                                    </>
                                : null }
                                {this.state.type==='Vendor'? <div className="col-sm-8"><label>Vendor Name</label><input name="name" type="text" className="form-control" placeholder="Vendor Name" value={this.state.name} required onChange={this.onChange}/></div> : null }
                                {this.state.type==='Puja'? 
                                <>
                                    <div className="col-sm-4">
                                        <label>Puja Items</label>
                                        <input name="name" type="text" className="form-control" placeholder="Vendor Name" value={this.state.name} required onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Quantity</label>
                                        <input name="tab1" type="text" className="form-control" placeholder="Quantity" value={this.state.tab1} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : null }
                            </div>
                            <div className="my-div">
                                <button className="amitBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Update Basic here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateBasic}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Type of Basic</label>
                                    <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type} readOnly>
                                        <option>{this.state.type}</option>
                                    </select>
                                </div>
                                {this.state.type==='Category'?
                                    <>
                                        <div className="col-sm-8">
                                            <label>Product Category</label>
                                            <input name="name" type="text" className="form-control" placeholder="Product Category" value={this.state.name} required onChange={this.onChange}/>
                                        </div> 
                                        <div className="col-sm-4">
                                            <img src={"/images/category/"+this.state.oldImage} className="previewImg"/>
                                            <label>Category Image (450px X 250px)</label>
                                            <input className="form-control" type="file" onChange={this.uploadImage}/>
                                        </div>
                                        <div className="col-sm-8">
                                            <label>URL</label>
                                            <input name="tab1" type="text" className="form-control" placeholder="URL" value={this.state.tab1} required onChange={this.onChange}/>
                                        </div>
                                    </>
                                : null }
                                {this.state.type==='Vendor'? <div className="col-sm-8"><label>Vendor Name</label><input name="name" type="text" className="form-control" placeholder="Vendor Name" value={this.state.name} required onChange={this.onChange}/></div> : null }
                                {this.state.type==='Puja'? 
                                    <>
                                        <div className="col-sm-4">
                                            <label>Puja Items</label>
                                            <input name="name" type="text" className="form-control" placeholder="Vendor Name" value={this.state.name} required onChange={this.onChange}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Quantity</label>
                                            <input name="tab1" type="text" className="form-control" placeholder="Quantity" value={this.state.tab1} required onChange={this.onChange}/>
                                        </div>
                                    </>
                                : null }
                            </div>
                            <div className="my-div">
                                <button className="amitBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                        {this.state.type==='Category'? <button className="amitBtn" onClick={this.deleteProductCategory}>Delete this <span></span></button> : null }
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Basic