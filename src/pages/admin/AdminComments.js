import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import { Modal } from 'reactstrap'
import axios from 'axios'
const func = require('../parts/functions')

export class AdminComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            comments:                   [],
            loading:                    true,
            name:                       '',
            email:                      '',
            comment:                    '',
            status:                     '',
            selectedComment:            '',
            editmodalIsOpen:            false,
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const res = await fetch('/admin/adminComments')
        const body = await res.json();
        if (res.status !== 200) throw Error(body.message)
        this.setState({
            comments:                   body.data,
            loading:                    false,
        })
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            name:                       i.user,
            email:                      i.email,
            comment:                    i.comment,
            status:                     i.status,
            selectedComment:            i.id  
        })       
    }

    resetData = ()=>{
        this.setState({
            editmodalIsOpen:            false,
            name:                       '',
            email:                      '',
            comment:                    '',
            status:                     '',
            selectedComment:            ''
        })
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }

    updateComment = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.selectedComment,
            name:               this.state.name,
            email :             this.state.email,
            comment :           this.state.comment,
            status :            this.state.status
        }    
        axios.post('/admin/updateComment', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    this.setState({ comments: this.state.comments.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.comments.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><a href={"/blog/"+i.url} target="_blank">{i.title}</a></td>
                    <td>{i.user}<br/>{i.email}</td> 
                    <td>{i.comment}</td> 
                    {/* <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td> */}
                    <td>{i.status == 1 ? "Show" : "Hide" }</td> 
                    <td>{i.updated_at}</td>
                    <td className="text-center editIcon"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.comments.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin admin">
                    <div className="row admin">
                        <AdminBar active="Comments"/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel </span>(Comments)</h1>
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
                                        <th>Sl No.</th>
                                        <th>Blog</th>
                                        <th>Name &amp; Email</th>
                                        <th>Comment</th>
                                        <th>Status</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="7" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Comment  Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateComment}>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Name</label>
                                <input className="form-control" type="text" placeholder="Add Name Here"  name="name" required value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Email</label>
                                <textarea className="form-control" type="email" placeholder="Add Email Here" name="title" required value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Comment</label>
                                <textarea className="form-control" type="text" placeholder="Add Comment" name="comment" required value={this.state.comment} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Status</label>
                                <select className="form-control" required value={this.state.status} onChange={this.onChange} name="status">
                                    <option>Select a Role</option>
                                    <option value="1">Show</option>
                                    <option value="0">Don't Show</option>
                                    {/* <option value="delete">Delete</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="my-div">
                            <button className="amitBtn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>
                <Footer/>
            </>
        )
    }
}
export default AdminComments