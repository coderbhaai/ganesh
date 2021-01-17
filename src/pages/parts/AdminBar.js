import React from 'react'

function AdminBar(props) {
    const links=[
        { url: "/admin/users", text: "Users" },
        { url: "/admin/basics", text: "Basics" },
        { url: "/admin/meta", text: "Meta" },
        { url: "/admin/blogs", text: "Blogs" },
        { url: "/admin/blogmeta", text: "Blog Meta" },
        { url: "/admin/comments", text: "Comments" },
        { url: "/admin/contacts", text: "Contact" },
        {url: "/admin/addProduct", text: "Add Product"},
        {url: "/admin/adminProducts", text: "Products"},
        {url: "/admin/adminOrders", text: "Orders"},
    ]
    return (
        <div className="col-sm-2 AdminBar">
            <ul>
                {links.map((i, index)=>( <li key={index}><a href={i.url} className={props.active===i.text? "active" : null}>{i.text}</a></li> ))}
            </ul>
        </div>
    )
}

export default AdminBar
