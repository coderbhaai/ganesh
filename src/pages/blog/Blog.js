import React, { Component} from 'react'
import BlogList from './BlogList'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class Blog extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            blogs:                      this.props.blogs,
            title:                      this.props.title
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        const slug = window.location.pathname.split("/").pop();
        if(slug === 'blog'){ const url = 'All'; const type = "All"; this.catApi(type, url); }        
        if(slug !== 'blog'){ const url = slug; const type = window.location.pathname.split("/")[1]; this.catApi(type, url); }
    }

    catApi = async (type, url) => {
        const response = await fetch('/blog/list/'+type+'/'+url)
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            blogs: body.blogs,
            title: body.title
        })
    }

    render() {
        return (
            <>
                <Header/>
                <div className="blogBanner">
                    <img src="/images/static/banner.jpg"/>
                    {this.state.title? <section dangerouslySetInnerHTML={{ __html: this.state.title }} /> :null }
                </div>
                <div className="container mt-5">
                    <div className="row blogs">
                        <BlogList blogs = {this.state.blogs}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
export default Blog