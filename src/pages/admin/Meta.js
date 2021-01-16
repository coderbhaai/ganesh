import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
const func = require('../parts/functions')
import axios from 'axios'

export class Meta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addmodalIsOpen:         false,
            editmodalIsOpen:        false,
            metas:                  [],
            url:                   '',
            title:                 '',
            description:           '',
            keyword:               '',
            selectedMeta:          '',
            newMeta:               '',
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

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    callApi = async () => {
        const response = await fetch( '/admin/AdminMetas' )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            metas:                  body.data,
            loading:                false,
        })
    }

    resetData = ()=>{ 
        this.setState({ 
            addmodalIsOpen:         false,
            editmodalIsOpen:        false,
            url:                    '',
            title:                  '',
            description:            '',
            keyword:                '',
            selectedMeta:           ''
        })
        window.scrollTo(0, 0)
    }

    addMeta = (e) => {
        e.preventDefault()
        const data={
            url:                this.state.url,
            title:              this.state.title,
            description:        this.state.description,
            keyword:            this.state.keyword
        } 
        axios.post('/admin/addMeta', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    this.setState({ metas: [...this.state.metas, res.data.data ] })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            url:                        i.url,
            title:                      i.title,
            description:                i.description,
            keyword:                    i.keyword,
            selectedMeta:               i.id  
        })        
    }

    updateMeta = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.selectedMeta,
            url:                this.state.url,
            title:              this.state.title,
            description:        this.state.description,
            keyword:            this.state.keyword
        } 
        axios.post('/admin/updateMeta', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    this.setState({ metas: this.state.metas.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }
    
    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.metas.filter((i)=>{ if(this.state.search == null) return i; else if(i.url.toLowerCase().includes(this.state.search.toLowerCase()) || i.title.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.url}</td>                                              
                    <td>
                        Title: {i.title}<br/>
                        Description: {i.description}<br/>
                        Keyword: {i.keyword}<br/>
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}/></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.metas.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row">
                    <AdminBar/>
                        <div className="col-sm-10">
                            <h2 className="heading">Admin ( Metas )</h2>
                            <div className="btn-pag">
                                <div className="perPage">
                                    <div>
                                        <label>Add Meta here</label>
                                        <button className="casleyBtn" onClick={this.addModalOn}>Add Meta</button>
                                    </div>
                                    <div>
                                        <label>Videos per page</label>
                                        <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                            <option>{itemsPerPage}</option>
                                            <option value="10">10</option> 
                                            <option value="25">25</option> 
                                            <option value="50">50</option> 
                                            <option value="100">100</option> 
                                        </select>
                                    </div>
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
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Sl no.</td>
                                        <td>URL</td>
                                        <td>Meta</td>
                                        <td>Edit</td>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="4" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer/>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Add Meta Tags Here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form encType="multipart/form-data" onSubmit={this.addMeta}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>URL</label>
                                    <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Title</label>
                                    <textarea className="form-control" type="text" placeholder="Add Title Here" name="title" required value={this.state.title} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Description</label>
                                    <textarea className="form-control" type="text" placeholder="Add Description" name="description" required value={this.state.description} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Keywords</label>
                                    <textarea className="form-control" type="text" placeholder="Add Keywords" name="keyword" required value={this.state.keyword} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="my-div">
                                <button className="casleyBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <ModalHeader> Update Meta Tags here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateMeta}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>URL</label>
                                    <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Title</label>
                                    <textarea className="form-control" type="text" placeholder="Add Title Here" name="title" required value={this.state.title} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Description</label>
                                    <textarea className="form-control" type="text" placeholder="Add Description" name="description" required value={this.state.description} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Keywords</label>
                                    <textarea className="form-control" type="text" placeholder="Add Keywords" name="keyword" required value={this.state.keyword} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="my-div">
                                <button className="casleyBtn" type="submit">Submit<span></span></button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Meta