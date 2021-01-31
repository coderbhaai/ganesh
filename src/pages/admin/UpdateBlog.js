import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
const func = require('../parts/functions')
import window from 'global'

export class UpdateBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:                         '',
            title:                      '',
            excerpt:                    '',
            blogURL:                    '',
            content:                    '',
            catOptions:                 [],
            tagOptions:                 [],
            selectedCategory:           [],
            selectedTag:                [],
            oldCoverImg:                '',
            blogImage:                  null,
            previewImg:                 null,
            category:                   [],
            tag:                        [],
            loading:                    true
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){ window.scrollTo(0, 0)
        const id = window.location.href.split("/").pop();
        this.setState({ id: id })
     }
     ckEditorReady=()=>{ this.callApi() }
     timeout=(delay)=>{ return new Promise( res => setTimeout(res, delay) ); }

    callApi=async()=>{
        await this.timeout(2000);
        if(this.state.loading && this.state.id){
            this.setState({ loading: false })
            axios.get('/admin/getBlog/'+this.state.id)
            .then(res =>{
                this.setState({ 
                    title:                          res.data.data.title,
                    excerpt:                        res.data.excerpt,
                    content:                        res.data.data.content,
                    blogURL:                        res.data.data.url,
                    oldCoverImg:                    res.data.data.coverImg,
                    category:                       res.data.catList,
                    tag:                            res.data.tagList,
                }) 
            })

            const response = await fetch( '/admin/blogMetaOptions' )
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message)
            this.setState({
                catOptions:          body.catOptions,
                tagOptions:          body.tagOptions
            })
        }
    }

	onEditorChange1( evt1 ) { this.setState( { content: evt1.editor.getData() } ) }
	handleChange1( changeEvent1 ) { this.setState( { content: changeEvent1.target.value } ) }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value }) }
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value }) }
    blogImage = (e) =>{ this.setState({ blogImage: e.target.files[0], previewImg: URL.createObjectURL(e.target.files[0]) })}
    
    updateBlogData= (e)=>{
        e.preventDefault()
        const catList = []; this.state.category.forEach(i => { catList.push(i.id) });
        const tagList = []; this.state.tag.forEach(i => { tagList.push(i.id) });
        var finalCategory = Array.from(new Set( [...catList, ...this.state.selectedCategory]));
        var finalTag = Array.from(new Set( [...tagList, ...this.state.selectedTag]));
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('file', this.state.blogImage)
        data.append('oldCoverImg', this.state.oldCoverImg)
        data.append('title', this.state.title)
        data.append('url', this.state.blogURL.replace(/ /g,"-"))
        data.append('excerpt', this.state.excerpt)
        data.append('content', this.state.content)
        data.append('category', JSON.stringify(finalCategory) )
        data.append('tag', JSON.stringify(finalTag) )
        axios.post('/admin/updateBlog', data)
            .catch(err=>{ func.printError(err) })
            .then(res=>{
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/admin/blogs'
                }
                func.callSwal(res.data.message)
            })
    }

    arrayCategoryRemove(index){
        this.state.category.splice(index, 1)
        this.setState({category: this.state.category})
    }

    arrayTagRemove(index){
        this.state.tag.splice(index, 1)
        this.setState({tag: this.state.tag})
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>Admin Panel</span>(Update Blog)</h1>
                            <form encType="multipart/form-data" onSubmit={this.updateBlogData}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Title</label>
                                        <input className="form-control" type="text" placeholder="Blog Title" name="title" required value={this.state.title} onChange={this.onChange}/> 
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Blog URL</label>
                                        <input className="form-control" value={this.state.blogURL} readOnly/> 
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Featured Image (1800px X 750px)</label>
                                        {this.state.previewImg? <img src={this.state.previewImg } alt="" className="img-fluid tableImg"/> : null}
                                        <input className="form-control" type="file" onChange={this.blogImage}/>
                                        <img src={"/images/blog/"+this.state.oldCoverImg } alt="" className="img-fluid tableImg"/>
                                    </div>
                                    <div className="col-sm-12 mb-3">
                                        <label>Excerpt</label>
                                        <textarea className="form-control" name="excerpt" required value={this.state.excerpt} onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="col-sm-12 mb-3">
                                        <label>Blog Content</label>
                                        <CKEditor 
                                        onInstanceReady={this.ckEditorReady()}
                                        onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.content} content= {this.state.content} onChange={this.onEditorChange1}/>
                                    </div>
                                    <div className="col-sm-6 blogMeta compare label-down">
                                        <label className="mb-0">Categories</label>
                                        <div className="update-treat">
                                            { this.state.category.length ? 
                                                <>
                                                    { this.state.category.map(( i, index)=><span className="ui label mr-3" key={index}>{i.name}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayCategoryRemove(index)}></i></span>, ) }
                                                </>
                                            : null}
                                        </div>
                                        <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.catOptions}/>
                                    </div>
                                    <div className="col-sm-6 blogMeta compare label-down">
                                        <label className="mb-0">Tags</label>
                                        <div className="update-treat">
                                            { this.state.tag.length ? 
                                                <>
                                                    { this.state.tag.map(( i, index)=><span className="ui label mr-3" key={index}>{i.name}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayTagRemove(index)}></i></span>, ) }
                                                </>
                                            : null }
                                        </div>
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

export default UpdateBlog