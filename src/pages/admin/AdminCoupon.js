import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
const func = require('../parts/functions')
import axios from 'axios'
import moment from "moment"
import { Dropdown } from 'semantic-ui-react'

export class AdminCoupon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                       [],
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            type:                       '',
            code:                       '',
            discount:                   '',
            dis_type:                   '',
            start:                      '',
            expiry:                     '',
            status:                     '',
            selectedId:                 '',
            search:                     '',
            currentPage:                1,
            itemsPerPage:               100,
            loading:                    true,
            productOptions:             [],
            product:                    [],
            oldProduct:                 []
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
    productSelected = (e, {value}) => { this.setState({ product: value }) }
    arrayProductRemove(index){ this.state.oldProduct.splice(index, 1); this.setState({oldProduct: this.state.oldProduct}); }

    callApi = async () => {
        const response = await fetch( '/admin/adminCoupon' )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            data:                   body.data,
            productOptions:         body.productOptions,
            loading:                false,
        })
    }

    resetData = ()=>{ 
        this.setState({ 
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            type:                       '',
            code:                       '',
            discount:                   '',
            dis_type:                   '',
            start:                      '',
            expiry:                     '',
            status:                     '',
            selectedId:                 '',
        })
        window.scrollTo(0, 0)
    }

    addHandler = (e) => {
        e.preventDefault()
        const data={
            type:                       this.state.type,
            code:                       this.state.code.toUpperCase(),
            product:                    JSON.stringify(this.state.product),
            discount:                   this.state.discount,
            dis_type:                   this.state.dis_type,
            start:                      this.state.start.split('T')[0],
            expiry:                     this.state.expiry.split('T')[0],
            status:                     this.state.status,
        }
        axios.post('/admin/addCoupon', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){ this.setState({ data: [...this.state.data, res.data.data ] }) }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            type:                       i.type,
            code:                       i.code,
            discount:                   i.discount,
            dis_type:                   i.dis_type,
            start:                      i.start.split('T')[0],
            expiry:                     i.expiry.split('T')[0],
            status:                     i.status,
            selectedId:                 i.id,
            loading:                    true,
        })
        const data={
            product :                   i.product
        }
        axios.post('/admin/productNames', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){ 
                    this.setState({ 
                        oldProduct:            res.data.data,
                        loading:                false,
                    }) 
                }
            })
    }

    updateHandler = (e) => {
        e.preventDefault()
        const cc = []; this.state.oldProduct.forEach(i => { cc.push(i.value) }); var finalProduct = Array.from(new Set( [...cc, ...this.state.product]));
        const data={
            id:                         this.state.selectedId,
            type:                       this.state.type,
            code:                       this.state.code.toUpperCase(),
            discount:                   this.state.discount,
            product:                    JSON.stringify(finalProduct),
            dis_type:                   this.state.dis_type,
            start:                      this.state.start.split('T')[0],
            expiry:                     this.state.expiry.split('T')[0],
            status:                     this.state.status,
        }
        axios.post('/admin/updateCoupon', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    changeStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }
        axios.post('/admin/changeCouponStatus', data)
        .then( res=>{
            if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>{ func.printError(err) })
    }
    
    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else if(i.code.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.type}</td>
                    <td>{i.code}</td>
                    <td>
                        {i.dis_type==0? <>&#8377; {+i.discount}</> : <>{+i.discount}%</>}<br/>
                        { i.dis_type==0? 'Value Based' : 'Percentage Base' }
                    </td>
                    <td>{moment.utc(i.start).format("DD MMMM  YYYY")} - {moment.utc(i.expiry).format("DD MMMM  YYYY")}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.changeStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
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
                            <h2 className="heading">Admin ( Coupon )</h2>
                            <div className="btn-pag">
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Coupon</button>
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
                                        <td>Code</td>
                                        <td>Discount</td>
                                        <td>Validity</td>
                                        <td>Status</td>
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
                    <ModalHeader> Add Coupon Here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form encType="multipart/form-data" onSubmit={this.addHandler}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Type of Coupon</label>
                                    <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                        <option value=''>Select Type</option>
                                        <option value="Single">Single Usage</option>
                                        <option value="Multiple">Multiple Usage</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Status</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value=''>Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Not Active</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Start</label>
                                    <input className="form-control" type="date" name="start" required value={this.state.start} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Expiry</label>
                                    <input className="form-control" type="date" name="expiry" required value={this.state.expiry} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Type of discount</label>
                                    <select className="form-control" required name="dis_type" onChange={this.onChange} value={this.state.dis_type}>
                                        <option value=''>Select Discount Type</option>
                                        <option value="0">Value Based</option>
                                        <option value="1">Percentage Base</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Discount</label>
                                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Discount % or amount" name="discount" required value={this.state.discount} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12">
                                    <label>Coupon Code</label>
                                    <input className="form-control" type="text" placeholder="Add Coupon Code Here" name="code" required value={this.state.code} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12 compare label-down mb-5">
                                    <label>Products</label>
                                    <Dropdown placeholder='Select products' fluid search multiple selection onChange={this.productSelected} options={this.state.productOptions}/>
                                </div>
                            </div>
                            <div className="my-div">
                                <button className="amitBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Update Coupon here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form encType="multipart/form-data" onSubmit={this.updateHandler}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Type of Coupon</label>
                                    <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                        <option value=''>Select Type</option>
                                        <option value="Single">Single Usage</option>
                                        <option value="Multiple">Multiple Usage</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Status</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value=''>Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Not Active</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Start</label>
                                    <input className="form-control" type="date" name="start" required value={this.state.start} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Expiry</label>
                                    <input className="form-control" type="date" name="expiry" required value={this.state.expiry} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Type of discount</label>
                                    <select className="form-control" required name="dis_type" onChange={this.onChange} value={this.state.dis_type}>
                                        <option value=''>Select Discount Type</option>
                                        <option value="0">Value Based</option>
                                        <option value="1">Percentage Base</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Discount</label>
                                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" placeholder="Discount % or amount" name="discount" required value={this.state.discount} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12">
                                    <label>Coupon Code</label>
                                    <input className="form-control" type="text" placeholder="Add Coupon Code Here" name="code" required value={this.state.code} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12 compare label-down my-5">
                                    <div className="update-treat">
                                        { this.state.oldProduct.length ? 
                                            <>
                                                { this.state.oldProduct.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayProductRemove(index)}></i></span>, ) }
                                            </>
                                        : null}
                                    </div>
                                    <label>Products</label>
                                    <Dropdown placeholder='Select products' fluid search multiple selection onChange={this.productSelected} options={this.state.productOptions}/>
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

export default AdminCoupon