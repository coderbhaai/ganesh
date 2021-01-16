import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody } from 'reactstrap';
import Sidebar from '../parts/AdminSidebar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import moment from "moment"

export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products:                 [],
            currentPage:           1,
            itemsPerPage:          100,
            search:                ''
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    componentDidMount(){
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/admin/adminProducts'); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            products:          body.data
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.products.filter((i)=>{ if(this.state.search == null) return i; else if(i.product.toLowerCase().includes(this.state.search.toLowerCase()) || i.category.toLowerCase().includes(this.state.search.toLowerCase()) || i.subcategory.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td style={{textAlign:'center'}}><img src={"images/products/" + JSON.parse(i.images)[0]} className="tableImg" style={{maxHeight:'80px', width: 'auto'}}/>{i.product}</td>
                    <td>{i.categoryName}</td>
                    <td>{i.subcategoryName}</td>
                    <td>{JSON.parse(i.sku).map((j, index)=>(
                        <p key={index}>
                            {'SKU:'} <strong>{j[4]}</strong>
                            {'=>Qty:'} <strong>{j[0]}</strong>
                            {'=>Price:'} <strong> &#8377;{j[1]}</strong>
                            {'=>In Stock:'} <strong>{j[2] ='1'? <span>Yes</span> : <span>No</span> }</strong>
                            {'=>Discount:'}  <strong>&#8377;{j[3]}</strong>
                        </p>
                        ))}
                    </td>
                    <td>{i.name}</td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    {/* <td>{i.updated_at}</td> */}
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.products.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel </span>(Users)</h1>
                    <div className="row admin">
                        <Sidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{width:'400px', marginRight:"1em"}}/>
                                <div>
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
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Sl no.</td>
                                        <td>Product</td>
                                        <td>Category</td>
                                        <td>SubCategory</td>
                                        <td>SKU</td>
                                        <td>Vendor</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody>{renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Products