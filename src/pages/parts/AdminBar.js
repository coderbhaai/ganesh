import React, { Component } from 'react'
const func = require('./functions')

export class AdminBar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            active:         '',
            role:           ''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ role: JSON.parse(localStorage.getItem('user')).role || '' })
        }
        this.setState({ active: window.location.pathname })
        if(window.location.pathname === '/admin'){ this.setState({ active: '/admin/users' }) }
        if(window.location.pathname === '/admin/addBlog'){ this.setState({ active: '/admin/blogs' }) }
        if(window.location.pathname.split("/")[2] === 'updateBlog'){ this.setState({ active: '/admin/blogs' }) }
        if(window.location.pathname.split("/")[2] === 'editProduct'){ this.setState({ active: '/admin/adminProducts' }) }
        if(window.location.pathname === '/user/admin'){ this.setState({ active: '/user/user-admin' }) }
    }

    render() {
        
        return (
            <div className="col-sm-2 AdminBar py-5">
                <ul>
                    {this.state.role=='Admin'?
                        func.adminLinks.map((i, index)=>( <li key={index}><a href={i.url} className={this.state.active===i.active? "active" : null}>{i.text}</a></li> ))
                    :
                        func.userLinks.map((i, index)=>( <li key={index}><a href={i.url} className={this.state.active===i.active? "active" : null}>{i.text}</a></li> ))
                    }
                </ul>
            </div>
        )
    }
}

export default AdminBar
