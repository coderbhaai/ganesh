import React, { Component } from 'react'

export class BlogList extends Component {
    render() {
        return (
            <>
                { this.props.blogs ?
                    <>
                        { this.props.blogs.map((i, index)=>{ 
                            let alt = i.coverImg.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                        return(
                            <div className="col-sm-4 " key={index}>
                                <div className="card">
                                    <a href={"/" + i.url}>
                                        <div><img src={"/images/blog/"+ i.coverImg } alt={alt}/></div>
                                        <div className="name">
                                            <h2>{i.title}</h2>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )})}
                    </>
                : null }
            </>
        )
    }
}

export default BlogList