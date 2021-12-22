import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
const func = require('../parts/functions')

class AdminBlogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            editBlogModalIsOpen:        false,
            title:                      '',
            blogURL:                    '',
            content:                    '',
            catOptions:                 [],
            tagOptions:                 [],
            selectedCategory:           [],
            selectedTag:                [],
            blogImage:                  null,
            blogUpdateImage:            null,
            blogList:                   [],
            previewImg:                 null,
            category:                   [],
            tag:                        [],
            blogId:                     '',
            currentPage:                1,
            itemsPerPage:               100,
            search:                     '',
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( '/admin/adminBlogs' ); 
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            blogList:          body.data
        })

        const response2 = await fetch( '/admin/blogMetaOptions' )
        const body2 = await response2.json();
        if (response2.status !== 200) throw Error(body2.message)
        this.setState({
            catOptions:          body2.catOptions,
            tagOptions:          body2.tagOptions
        })
    }

	onEditorChange1( evt1 ) { this.setState( { content: evt1.editor.getData() } ) }
	handleChange1( changeEvent1 ) { this.setState( { content: changeEvent1.target.value } ) }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }

    render() {
        const imgPath = "/images/blog/"
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.blogList.filter((i)=>{ if(this.state.search == null) return i; else if(i.title.toLowerCase().includes(this.state.search.toLowerCase()) || i.url.toLowerCase().includes(this.state.search.toLowerCase())){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>                                              
                    <td><a href={"/" + i.url} target="_blank">{i.title}</a></td>
                    <td className="text-center"><img src={'/images/blog/'+i.coverImg } className="img-fluid tableImg"/></td>                    
                    <td className="editIcon text-center"><a href={"/admin/updateBlog/"+i.id}><img src="/images/icons/edit.svg"/></a></td>
                    {/* <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editBlogOn(i)}/></td> */}
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.blogList.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel</span>(Blogs)</h1>
                            <div className="btn-pag">
                                <div className="btn-pag">
                                    <a href="/admin/addBlog" className="clientBtn">Add Blogs</a>
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
                                        <td>Blog Name</td>
                                        <td>Cover Image</td>
                                        <td>Edit</td>
                                    </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="4" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
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
export default AdminBlogs