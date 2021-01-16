import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import swal from 'sweetalert'
import moment from "moment"

class AdminOrders extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            orders:                [],            
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
        const response = await fetch('/admin/adminOrders'); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            orders:          body.orders
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.orders.filter((i)=>{ if(this.state.search == null) return i; else if(i.buyer.toLowerCase().includes(this.state.search.toLowerCase()) || i.cart.toLowerCase().includes(this.state.search.toLowerCase()) || i.address.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{JSON.parse(i.buyer)[0]}<br/>{JSON.parse(i.buyer)[1]}<br/>{JSON.parse(i.buyer)[2]}</td>                                              
                    <td>{JSON.parse(i.address)[3]}, {JSON.parse(i.address)[2]}, {JSON.parse(i.address)[1]}, {JSON.parse(i.address)[0]} - {JSON.parse(i.address)[4]}</td>                                              
                    <td>{JSON.parse(i.cart).map((j, index2)=>( <span key={index2}>{j[4]}- {j[1]}@{j[3]}, </span> )) }</td>
                    <td>{JSON.parse(i.seller).map((j, index2)=>( <span key={index2}>{j}, </span> )) }</td>
                    <td>{i.status}</td>
                    <td>Cost: &#8377;{JSON.parse(i.invoice)[0]}, Shipping: &#8377;{JSON.parse(i.invoice)[1]}, Discount: &#8377;{JSON.parse(i.invoice)[2]},<strong> Total: &#8377;{JSON.parse(i.invoice)[3]}</strong></td>
                    {/* 
                    
                <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}/></td> */}
                <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.orders.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel </span>(Orders)</h1>
                    <div className="row admin">
                        <AdminBar/>
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
                                        <td>Buyer</td>
                                        <td>Address</td>
                                        <td>Cart</td>
                                        <td>Seller</td>
                                        <td>Status</td>
                                        <td>Amount</td>
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
export default AdminOrders