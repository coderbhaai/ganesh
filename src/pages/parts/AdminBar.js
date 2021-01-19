import React, { Component } from 'react'

export class AdminBar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            active:        ''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({ active: window.location.pathname })
        if(window.location.pathname === '/admin/addBlog'){ this.setState({ active: '/admin/blogs' }) }
        if(window.location.pathname.split("/")[2] === 'updateBlog'){ this.setState({ active: '/admin/blogs' }) }
        if(window.location.pathname.split("/")[2] === 'editProduct'){ this.setState({ active: '/admin/adminProducts' }) }
    }

    render() {
        const links=[
            { url: "/admin/users", text: "Users" , active: '/admin/users' },
            { url: "/admin/basics", text: "Basics" , active: '/admin/basics' },
            { url: "/admin/meta", text: "Meta" , active: '/admin/meta' },
            { url: "/admin/blogs", text: "Blogs" , active: '/admin/blogs' },
            { url: "/admin/blogmeta", text: "Blog Meta" , active: '/admin/blogmeta' },
            { url: "/admin/comments", text: "Comments" , active: '/admin/comments' },
            { url: "/admin/contacts", text: "Contact" , active: '/admin/contacts' },
            { url: "/admin/addProduct", text: "Add Product", active: '/admin/addProduct' },
            { url: "/admin/adminProducts", text: "Products", active: '/admin/adminProducts' },
            { url: "/admin/adminOrders", text: "Orders", active: '/admin/adminOrders' },
        ]
        return (
            <div className="col-sm-2 AdminBar py-5">
                <ul>
                    {links.map((i, index)=>( <li key={index}><a href={i.url} className={this.state.active===i.active? "active" : null}>{i.text}</a></li> ))}
                </ul>
            </div>
        )
    }
}

export default AdminBar
