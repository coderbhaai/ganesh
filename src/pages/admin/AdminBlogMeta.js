import React, { Component } from 'react'
import AdminBar from '../parts/AdminBar'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import axios from 'axios'
const func = require('../parts/functions')

class AdminBlogMeta extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            metas:                      [],
            addMetaModalIsOpen:         false,  
            editMetaModalIsOpen:        false,  
            name:                       '',
            url:                        '',
            type:                       '',
            cover:                      null,
            coverPreview:               '',
            oldCover:                   '',
            selectedMeta:               '',
            currentPage:                1,
            itemsPerPage:               100,
            search:                     '',
        }
    }

    componentDidMount(){
        this.callApi()
        window.scrollTo(0, 0)
    }

    callApi = async () => {
        const response = await fetch('/admin/adminBlogMeta'); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ metas: body.data })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    addMetaModalOn = ()=>{ this.setState({ addMetaModalIsOpen: true }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    resetData = ()=>{
        this.setState({ 
            addMetaModalIsOpen:         false,
            name:                       '',
            url:                        '',
            type:                       '',
            editMetaModalIsOpen:         false,
            name:                       '',
            url:                        '',
            type:                       '',
            selectedMeta:               '',
            cover:                      null,
            coverPreview:               '',
            oldCover:                   '',
        })
        window.scrollTo(0, 0)
    }

    addBlogMetaData = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('url', this.state.url.replace(/ /g,"-"))
        data.append('cover', this.state.cover)
        axios.post('/admin/addBlogMeta', data)
            .catch(err=>console.log('err', err))
            .then(res=>{ 
                if(res.data.success){ this.setState({ metas: [...this.state.metas, res.data.data ] }) }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }
    
    editMetaModalOn = (i)=>{
        this.setState({
            editMetaModalIsOpen:            true,
            name:                           i.name,
            url:                            i.url,
            type:                           i.type,
            selectedMeta:                   i.id,
            oldCover:                       i.name
        })
    }

    updateBlogMetaData = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('id', this.state.selectedMeta)
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('url', this.state.url.replace(/ /g,"-"))
        data.append('cover', this.state.cover)
        data.append('oldCover', this.state.oldCover)
        axios.post('/admin/updateBlogMeta', data)
            .catch(err=>console.log('err', err))
            .then(res=>{ 
                if(res.data.success){
                    this.setState({ metas: this.state.metas.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                func.callSwal(res.data.message)
            })
        this.resetData()
    }

    addCover = (e) =>{
        this.setState({
            cover: e.target.files[0],
            coverPreview: URL.createObjectURL(e.target.files[0])
          })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.metas.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.url.toLowerCase().includes(this.state.search.toLowerCase()) || i.type.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.type}</td>
                    <td>{i.name}</td>                                              
                    <td>{i.url}</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editMetaModalOn(i)}/></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.metas.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel</span>(Blog Meta)</h1>
                            <div className="btn-pag">
                                <button className="casleyBtn" onClick={this.addMetaModalOn}>Add Blog Meta</button>
                                <div>
                                    <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                        <option>{itemsPerPage}</option>
                                        <option value="10">10</option> 
                                        <option value="25">25</option> 
                                        <option value="50">50</option> 
                                        <option value="100">100</option> 
                                    </select>
                                    <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{width:'400px', marginRight:"1em"}}/>
                                    <div><ul className="page-numbers">{renderPagination}</ul></div>
                                </div>
                            </div>
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Sl no.</td>
                                        <td>Type</td>
                                        <td>Name</td>
                                        <td>URL</td>
                                        <td>Edit</td>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="5" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addMetaModalIsOpen} className="adminModal tightModal"> 
                    <ModalHeader> Add Blog Meta Here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form className="modal-form" encType="multipart/form-data" onSubmit={this.addBlogMetaData}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Type</label>
                                    <select type="select"  className="form-control" required name="type" value={this.state.type} onChange={this.onChange}>
                                        <option>Select Type</option>
                                        <option value="category">Category</option>
                                        <option value="tag">Tag</option>
                                        <option value="page">Page</option>
                                    </select>
                                </div>
                                {this.state.type=='page'?
                                    <div className="col-sm-6">
                                        <label>Cover Image</label>
                                        { this.state.coverPreview ? <img className="preview" src={this.state.coverPreview}/> : null }
                                        <input className="form-control" name="cover" type="file" onChange={this.addCover}/>
                                    </div>
                                    : 
                                    <div className="col-sm-6">
                                        <label>Name</label>
                                        <input className="form-control" type="text" placeholder="name of Meta" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                }
                                <div className="col-sm-12">
                                    <label>URL</label>
                                    <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="my-btn">
                                <button className="casleyBtn" type="submit">Submit</button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.editMetaModalIsOpen} className="adminModal tightModal"> 
                    <ModalHeader> Update Blog Category and Tags Here </ModalHeader>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                    <ModalBody>
                        <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateBlogMetaData}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Type</label>
                                    <input className="form-control" type="text" value={this.state.type} readOnly/>
                                </div>
                                {this.state.type=='page'?
                                    <div className="col-sm-6">
                                        <label>Update Cover Image</label>
                                        { this.state.coverPreview ? <img className="preview" src={this.state.coverPreview}/> : null }
                                        <input className="form-control" name="cover" type="file" onChange={this.addCover}/>
                                    </div>
                                    : 
                                    <div className="col-sm-6">
                                        <label>Name</label>
                                        <input className="form-control" type="text" placeholder="name of Meta" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                }
                                <div className="col-sm-12">
                                    <label>URL</label>
                                    <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="my-btn">
                                <button className="casleyBtn" type="submit">Submit</button> 
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <Footer/>
            </>
        )
    }
}

export default AdminBlogMeta