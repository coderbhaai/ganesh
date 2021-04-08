import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
const func = require('../parts/functions')

export class AddBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:                      '',
            blogURL:                    '',
            excerpt:                    '',
            content:                    '',
            catOptions:                 [],
            tagOptions:                 [],
            selectedCategory:           [],
            selectedTag:                [],
            blogImage:                  null,
            previewImg:                 null,
            smallBlogImage:             null,
            previewSmallImg:            null,
            category:                   [],
            tag:                        [],
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( '/admin/blogMetaOptions' )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            catOptions:          body.catOptions,
            tagOptions:          body.tagOptions
        })
    }

	onEditorChange1( evt1 ) { this.setState( { content: evt1.editor.getData() } ) }
	handleChange1( changeEvent1 ) { this.setState( { content: changeEvent1.target.value } ) }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    blogImage = (e) =>{ this.setState({ blogImage: e.target.files[0], previewImg: URL.createObjectURL(e.target.files[0]) })}
    smallBlogImage = (e) =>{ this.setState({ smallBlogImage: e.target.files[0], previewSmallImg: URL.createObjectURL(e.target.files[0]) }) }

    addBlogData= (e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.blogImage)
        data.append('smallBlogImage', this.state.smallBlogImage)
        data.append('title', this.state.title)
        data.append('url', this.state.blogURL.replace(/ /g,"-").toLowerCase())
        data.append('excerpt', this.state.excerpt)
        data.append('content', this.state.content)
        data.append('category', JSON.stringify(this.state.selectedCategory) )
        data.append('tag', JSON.stringify(this.state.selectedTag) )
        axios.post('/admin/addBlog', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{ 
                if(res.data.success){ 
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/admin/blogs'
                }
                func.callSwal(res.data.message)
            })
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel</span> (Add Blog)</h1>
                            <form encType="multipart/form-data" onSubmit={this.addBlogData}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Title</label>
                                        <input className="form-control" type="text" placeholder="Blog Title" name="title" required value={this.state.title} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Blog URL</label>
                                        <input className="form-control" type="text" placeholder="Blog URL" name="blogURL" required value={this.state.blogURL} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-4">
                                        {this.state.previewImg? <img src={this.state.previewImg } alt="" className="img-fluid tableImg"/> : null}
                                        <label>Featured Image (1800px X 750px)</label>
                                        <input className="form-control" type="file" onChange={this.blogImage}/>
                                    </div>
                                    <div className="col-sm-8 mb-3">
                                        <label>Excerpt</label>
                                        <textarea className="form-control" name="excerpt" required value={this.state.excerpt} onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="col-sm-4">
                                        {this.state.previewSmallImg? <img src={this.state.previewSmallImg } alt="" className="img-fluid tableImg"/> : null}
                                        <label>Small Image</label>
                                        <input className="form-control" type="file" onChange={this.smallBlogImage}/>
                                    </div>
                                    <div className="col-sm-12 mb-3">
                                        <label>Blog Content</label>
                                        <CKEditor 
                                            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                            content= {this.state.content}
                                            onChange={this.onEditorChange1}
                                            config={ { extraAllowedContent: "*(*); div(col-sm-*, container-fluid, container, row)" } }
                                        />
                                    </div>
                                    <div className="col-sm-6 blogMeta compare label-down">
                                        <label>Categories</label>
                                        <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                    </div>
                                    <div className="col-sm-6 blogMeta compare label-down">
                                        <label>Tags</label>
                                        <Dropdown placeholder='Select Tags' multiple fluid search selection onChange={this.tagSelected} options={this.state.tagOptions}/>
                                    </div>
                                </div>
                                <div className="my-div">
                                    <button className="amitBtn" type="submit">Submit<span></span></button> 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddBlog
