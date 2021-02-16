import React, { Component } from 'react'

class Sidebar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            search:                 ''
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
        
    render() {
        return (
            <div className="col-sm-3 sidebar">
                <div className='search'>
                    <input className="form-control" type="text" placeholder="Search for" name="search" required value={this.state.search} onChange={this.onChange}/>
                    <div className="form-group text-center">
                        <a href={"/search/" + this.state.search} type="Submit" className="amitBtn" style={{padding:'5px 1em'}}>Search</a>
                    </div>
                </div>
                {this.props.blogList?
                    <div className="list">
                        <h3>Recent Blogs</h3>
                        <ul>{this.props.blogList.map((i, index) =><li key={index}><a href={"/" + i.url}>{i.title}</a></li> )}</ul>
                    </div>
                :null}
                {this.props.cats?
                    <div className="list">
                        <h3>Blog Categories</h3>
                        <ul>{ this.props.cats.map((i, index) => <li key={index}><a href={"/category/" + i.url}>{i.name}</a></li> )}</ul>
                    </div>
                :null}
                {this.props.tags?
                    <div className="list">
                        <h3>Blog Tags</h3>
                        <ul>{ this.props.tags.map((i, index) => <li key={index}><a href={"/tag/" + i.url}>{i.name}</a></li> )}</ul>
                    </div>
                :null}
            </div>
            // <>
            //     <div className="form-group flex-center-h">
            //         <h3>Search for Blogs here</h3>
            //         <input className="form-control" type="text" placeholder="Search for" name="search" required value={this.state.search} onChange={this.onChange}/>
            //         <div className="form-group text-center">
            //             <a href={"/search/" + this.state.search} type="Submit" className="amitBtn" style={{padding:'5px 1em'}}>Search</a>
            //         </div>
            //     </div>
            //     {this.props.blogList?
            //         <div className="categories mt-5">
            //             <h3>Recently Published</h3>
            //             <ul>{this.props.blogList.map((i, index) =><li key={index}><a href={"/" + i.url}>{i.title}</a></li> )}</ul>
            //         </div>
            //     :null}
            //     {this.props.cats?
            //         <div className="categories mt-5">
            //             <h3>Category List</h3>
            //             <ul>{ this.props.cats.map((i, index) => <li key={index}><a href={"/category/" + i.url}>{i.name}</a></li> )}</ul>
            //         </div>
            //     :null}
            //     {this.props.tags?
            //         <div className="tags mt-5">
            //             <h3>Tag List</h3>
            //             <ul>{ this.props.tags.map((i, index) => <li key={index}><a href={"/tag/" + i.url}>{i.name}</a></li> )}</ul>
            //         </div>
            //     :null}
            // </>
        )
    }
}
export default Sidebar