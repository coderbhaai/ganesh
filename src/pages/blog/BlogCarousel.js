import React from 'react'

function BlogCarousel(props) {
    return (
        <div>
            {props.blogs ? 
                <div className="container blogs py-5">
                    {props.blogs.length ? <h2 className="heading">Interesting Reads</h2> : null}
                    <div className="row">
                    { props.blogs.sort(() => 0.5 - Math.random()).slice(0,3).map((i, index)=>{
                        let alt = i.smallImg.replace('.jpg', '').replace('.png', '').replace(/_/g, ' ').replace(/-/g, ' ')
                        return(
                            <div className="col-sm-4 " key={index}>
                                <div className="card">
                                    <a href={"/" + i.url}>
                                        <div><img src={"/images/blog/"+ i.smallImg } alt={alt}/></div>
                                        <div className="name">
                                            <h2>{i.title}</h2>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ) })}
                    </div>
                </div>
            : null }
        </div>
    )
}

export default BlogCarousel
