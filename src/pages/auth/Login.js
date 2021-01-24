import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import api from '../parts/api'
const func = require('../parts/functions')
class Login extends Component {
    constructor(props){
        super(props)        
        this.state = {
            email:              '',
            password:           '',
            // email:              'test@test.com',
            // password:           '123456789',
            auth:               false,
            // blogs:              this.props.blogs,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
        }
        const url = window.location.href.split("e=");
        if(url[1]){
            localStorage.removeItem('user')
            this.setState({ auth: false })
            window.location.href = '/login'
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    submitHandler = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email,
            password:                   this.state.password,
        }               
        axios.post(api.login, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/'
                }else{ func.callSwal(res.data.message) }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        if(this.state.auth){ window.location.href = '/' }
        return (
            <>
                <Header/>
                <section className="login py-5">
                    <div className="container">
                        <h1 className="heading">Login</h1>
                        <div className="row">
                            <div className="col-sm-4 flex-h">
                                <img src="images/static/login.jpg" alt=""/>
                            </div>
                            <div className="col-sm-8">
                                <form onSubmit={this.submitHandler}>
                                    <label>E-Mail Address</label>
                                    <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange} value={this.state.email}/>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange} value={this.state.password}/>
                                    <div className="my-div">
                                        <button className="amitBtn mr-5" type="submit">Login</button>
                                        <a href="/forgot-password" className="amitBtn">Forgot Password</a>
                                    </div>
                                </form>
                                <h2 className="heading">How we Work</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }
}
export default Login