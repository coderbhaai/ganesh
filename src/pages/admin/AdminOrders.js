import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import moment from "moment"
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
const func = require('../parts/functions')
import axios from 'axios'

class AdminOrders extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            orders:                     [],   
            editmodalIsOpen:            false,  
            id:                         '',
            remarks:                    '',
            status:                     '',       
            currentPage:                1,
            itemsPerPage:               100,
            search:                     ''
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    componentDidMount(){
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/admin/getOrders'); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            orders:          body.orders
        })
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            id:                         i.id,
            remarks:                    i.remarks,
            status:                     i.status
        })        
    }

    resetData = ()=>{ 
        this.setState({ 
            editmodalIsOpen:            false,
            id:                         '',
            remarks:                    '',
            status:                     ''
        })
        window.scrollTo(0, 0)
    }

    updateOrderStatus = (e) => {
        e.preventDefault()
        const data={
            id:                     this.state.id,
            status:                 this.state.status,
            remarks:                this.state.remarks,
        }
        axios.post('/admin/updateOrderStatus', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                this.setState({ orders: this.state.orders.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                func.callSwal(res.data.message)
                this.resetData()
            })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.orders.filter((i)=>{ if(this.state.search == null) return i; else if(i.status.toLowerCase().includes(this.state.search.toLowerCase()) || i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <tr key={index} className="cart">
                    <td>{index +1}</td>
                    <td>{i.orderId}</td>
                    <td>{i.name}<br/>{i.email}<br/>{JSON.parse(i.address)[5]}</td>
                    <td>{JSON.parse(i.address)[0]}, {JSON.parse(i.address)[1]}, {JSON.parse(i.address)[2]}<br/> {JSON.parse(i.address)[3]}</td> 
                    <td>
                        {JSON.parse(i.cart).map((j,index2)=>(
                            <a key={index2} target="_blank" href={"/product/"+j[5]}>
                                <p>{j[3]} X {j[0]} @{j[4]}</p>
                                {j[7] ? <p><strong> Date :</strong> {moment(j[7]).format("DD MMMM YYYY")}</p> :null}
                                {j[8]? <p><strong> Place :</strong>{j[8]}</p> :null}
                            </a>
                        ))}
                    </td>
                    <td>&#8377;{i.invoice}<br/>{i.discount? <>After Discount of &#8377;{i.discount}</> : null}</td>
                    <td>{i.status}</td>                    
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}/></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.orders.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Orders)</h1>
                            <div className="btn-pag">
                                <div className="btn-pag">
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
                                        <td>Order Number</td>
                                        <td>Buyer</td>
                                        <td>Address</td>
                                        <td>Cart</td>
                                        <td>Amount</td>
                                        <td>Status</td>
                                        <td>Date</td>
                                        <td>Update</td>
                                    </tr>
                                </thead>
                                <tbody>{renderItems}</tbody>
                            </table>
                            <ul className="page-numbers mb-5">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Footer/>

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Update Order Status here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateOrderStatus}>
                            <div className="row">
                                <div className="col-sm-12 mb-3">
                                    <label>Order Status</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value={this.state.status}>{this.state.status}</option>
                                        <option value=''>Select Order Status</option>
                                        <option value='In Process'>In Process</option>
                                        <option value='Being Delivered'>Being Delivered</option>
                                        <option value='Closed'>Closed</option>
                                    </select>
                                </div>
                                <div className="col-sm-12">
                                    <label>Remarks</label>
                                    <textarea name="remarks" type="text" className="form-control" placeholder="Remarks" value={this.state.remarks || ''} onChange={this.onChange}/>
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
export default AdminOrders