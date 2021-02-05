import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
import moment from "moment"
const func = require('../parts/functions')

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
        const response = await fetch('/admin/getProducts'); 
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            products:          body.data
        })
    }

    changeStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }
        axios.post('/admin/changeProductStatus', data)
        .then( res=>{
            if(res.data.success){ this.setState({ products: this.state.products.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>{ func.printError(err) })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.products.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map(( i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td><a href={"/product/"+i.url} target="_blank">{i.name}</a></td>
                    <td>{i.vendor}</td>
                    <td style={{textAlign:'center'}}><img src={"/images/product/" + JSON.parse(i.images)[0]} className="tableImg" style={{maxHeight:'80px', width: 'auto'}}/>{i.product}</td>
                    <td>{i.price}</td>
                    <td>{i.rating}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.changeStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td className="editIcon text-center"><a href={"/admin/editProduct/"+i.id}><img src="/images/icons/edit.svg"/></a></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.products.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Products)</h1>
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
                                        <td>Product</td>
                                        <td>Vendor</td>
                                        <td>Image</td>
                                        <td>Price</td>
                                        <td>Rating</td>
                                        <td>Display</td>
                                        <td>Date</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>{renderItems}</tbody>
                            </table>
                            <ul className="page-numbers mb-5">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Products