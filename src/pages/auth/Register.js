import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import api from '../parts/api'
const func = require('../parts/functions')

class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            // name:                       '',
            // email:                      '',
            // role:                       'User',
            // password:                   '',
            // password_confirmation:      '',
            name:                       'Test',
            email:                      'test@test.com',
            role:                       'User',
            password:                   '123456789',
            password_confirmation:      '123456789',
            auth:                       false,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
            if(JSON.parse(localStorage.getItem('user')).auth){
                window.location.href = '/'
            }
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    submitHandler = e => {
        e.preventDefault()
        const data={
            name:                       this.state.name, 
            email:                      this.state.email,
            role:                       this.state.role,
            password:                   this.state.password,
            password_confirmation:      this.state.password_confirmation
        }               
        axios.post(api.register, data)
        .then( res=>{
            if(res.data.success){
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem( 'message', res.data.message )
                window.location.href = '/'
            }else{
                func.callSwal(res.data.message)
            }
        })
        .catch(err=>console.log('err', err))
    }
    
    render() {
        return (
            <>
                <Header/>
                <section className="register py-5">
                    <div className="container my-5">
                        <h1 className="heading">Register</h1>
                        <div className="row">
                            <div className="col-sm-6 flex-h">
                                <img src="images/static/family-5.svg" alt=""/>
                            </div>
                            <div className="col-sm-6">
                                <form onSubmit={this.submitHandler}>
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" value={this.state.name} required placeholder="Name Please" onChange={this.onChange}/>
                                    <label>E-Mail Address</label>
                                    <input type="email" className="form-control" name="email" value={this.state.email} required placeholder="Email Please" onChange={this.onChange}/>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} required placeholder="Password Please" onChange={this.onChange}/>
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" name="password_confirmation" value={this.state.password_confirmation} required placeholder="Confirm Password" onChange={this.onChange}/>
                                    <div className="my-div"><button className="amitBtn" type="submit">Register</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }
}
export default Register