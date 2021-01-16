import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
const func = require('../parts/functions')

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:             '',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        // this.callApi()
    }

    // callApi = async () => {
    //     const response = await fetch('/suggest')
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message)
    //     this.setState({ blogs: body.blogs })
    // }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    ResetPassword = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email
        }
        axios.post('/auth/forgotPassword', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
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
                <div className="container my-5">
                    <h1 className="heading">Forgot Password</h1>
                    <div className="row blogs">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <form onSubmit={this.ResetPassword}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>E-Mail Address</label>
                                        <input id="emailRegister" type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange}/>
                                    </div>
                                    <button className="casleyBtn" type="submit">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
export default ForgotPassword