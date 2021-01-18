import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users:                  [],
            search:                 '',
            currentPage:           1,
            itemsPerPage:          100,
            loading:               true,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }

    callApi = async () => {
        const response = await fetch( '/admin/AdminUsers' )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            users:                  body.data,
            loading:                false,
        })
    }
    
    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.users.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.email.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.role}</td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.users.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h2 className="heading">Admin ( Users Data)</h2>
                            <div className="btn-pag">
                                <div className="noFlex perPage">
                                    <label>Users per page</label>
                                    <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                        <option>{itemsPerPage}</option>
                                        <option value="10">10</option> 
                                        <option value="25">25</option> 
                                        <option value="50">50</option> 
                                        <option value="100">100</option> 
                                    </select>
                                </div>
                                <div className="search">
                                    <div className="noFlex searchInput">
                                        <label>Search Here</label>
                                        <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)}/>
                                    </div>
                                    <div className="noFlex">
                                        <label>Page Numbers</label>
                                        <ul className="page-numbers">{renderPagination} </ul>
                                    </div>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Sl No.</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Role</td>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="5" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
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

export default User
