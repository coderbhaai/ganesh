import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import api from '../parts/api'
const func = require('../parts/functions')
import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

class Auth extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            name:                       '',
            email:                      '',
            role:                       'User',
            password:                   '',
            password_confirmation:      '',
            // name:                       'Test',
            // email:                      'test@test.com',
            // role:                       'User',
            // password:                   '123456789',
            // password_confirmation:      '123456789',
            auth:                       false,
            active:                     'Register',
            clientId:                   '646152523176-i1660jbh9fk7cmb64jh5obhk1f7giimt.apps.googleusercontent.com',
            clientSecret:               'ewg2pkrHQR7zTyYCydrCMWTy'
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
        console.log('window.location.pathname.split("/")[1]', window.location.pathname.split("/")[1])
        if(window.location.pathname.split("/")[1] === 'reset-password'){ this.setState({ active: 'Reset Password' }) }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    Register = e => {
        e.preventDefault()
        const data={
            name:                       this.state.name, 
            email:                      this.state.email,
            role:                       this.state.role,
            password:                   this.state.password,
            password_confirmation:      this.state.password
            // password_confirmation:      this.state.password_confirmation
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
        .catch(err=>{ func.printError(err) })
    }

    Login = e =>{
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

    forgotPassword = e =>{
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
            .catch(err=>{ func.printError(err) })
    }

    changeActive=(value)=>{ this.setState({ active: value }) }

    gofbRegisteration(res, type) {
        if(type=='Google'){
            var data = {
                name: res.profileObj.name,
                email: res.profileObj.email,
                token: res.googleId,
                image: res.profileObj.imageUrl,
                provider: 'Google',
                role: this.state.role
            };
        }else if(type=='FB'){
            var data = {
                name: res.name,
                email: res.email,
                token: res.userID,
                image: res.picture.data.url,
                provider: 'FB',
                role: this.state.role
            };
        }
        axios.post(api.gofbRegister, data)
            .then( res=>{
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem( 'message', res.data.message )
                    window.location.href = '/'
                }else{
                    func.callSwal(res.data.message)
                }
            })
            .catch(err=>{ func.printError(err) })
    };

    gofbLogin = (res, type) =>{
        if(type=='Google'){
            var data = {
                email: res.profileObj.email,
                token: res.googleId,
            };
        }else if(type=='FB'){
            var data = {
                email: res.email,
                token: res.userID,
            };
        }
        axios.post(api.gofbLogin, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/'
                }else{ func.callSwal(res.data.message) }
            })
            .catch(err=>{ func.printError(err) })
    }

    resetPassword=(e)=>{
        e.preventDefault()
        const data={
            token:                      window.location.href.split("/").pop(),
            email:                      this.state.email,
            password:                   this.state.password,
            confirm_password:           this.state.confirm_password
        } 
        console.log('data', data)              
        axios.post('/auth/resetPassword', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/login'
                }else{
                    func.callSwal(res.data.message)
                }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        const regGoogle = (res) => { this.gofbRegisteration(res, 'Google'); }
        const loginGoogle = (res) => { this.gofbLogin(res, 'Google'); }
        const regFB = (res) => { this.gofbRegisteration(res, 'FB'); }
        const loginFB = (res) => { this.gofbLogin(res, 'FB'); }

        return (
            <>
                <Header/>
                <section className="auth py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7">
                                {/* <img src="images/static/register.jpg" alt=""/> */}
                            </div>
                            <div className="col-sm-5 authBox">
                                <h1 className="heading">{this.state.active}</h1>
                                {/* <ul>
                                    <li onClick={()=>this.changeActive('Register')} className={this.state.active =='Register' ? 'active' : null}>Register</li>
                                    <li onClick={()=>this.changeActive('Login')} className={this.state.active =='Login'  ? 'active' : null}>Login</li>
                                    <li onClick={()=>this.changeActive('Reset')} className={this.state.active =='Reset' ? 'active' : null}>Forgot Password</li>
                                </ul> */}
                                { this.state.active=='Register' ?
                                    <>
                                        <p className="check">Already have an account? <span  onClick={()=>this.changeActive('Login')}>Sign In</span></p>
                                        <div className="gofb">
                                            <GoogleLogin clientId={this.state.clientId} buttonText="Register with Google" onSuccess={regGoogle} onFailure={regGoogle} ></GoogleLogin>
                                            <FacebookLogin textButton="Sign up with Facebook" appId="885798875528804" autoLoad={false} fields="name,email,picture" callback={regFB}/>
                                        </div>
                                        <p className="text-center my-3">Or create with</p>
                                        <form onSubmit={this.Register}>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" name="name" value={this.state.name} required placeholder="Name Please" onChange={this.onChange}/>
                                                </div>
                                                <div className="col-sm-12">
                                                    <label>E-Mail Address</label>
                                                    <input type="email" className="form-control" name="email" value={this.state.email} required placeholder="Email Please" onChange={this.onChange}/>
                                                </div>
                                                <div className="col-sm-12">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" name="password" value={this.state.password} required placeholder="Password Please" onChange={this.onChange}/>
                                                </div>
                                                {/* <div className="col-sm-6">
                                                    <label>Confirm Password</label>
                                                    <input type="password" className="form-control" name="password_confirmation" value={this.state.password_confirmation} required placeholder="Confirm Password" onChange={this.onChange}/>
                                                </div> */}
                                            </div>
                                            <div className="my-div"><button className="amitBtn" type="submit">Register</button></div>
                                        </form>
                                    </>
                                : this.state.active=='Login' ?
                                    <>
                                        <form onSubmit={this.Login}>
                                            <label>E-Mail Address</label>
                                            <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange} value={this.state.email}/>
                                            <label>Password</label>
                                            <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange} value={this.state.password}/>
                                            <div className="my-div">
                                                <button className="amitBtn mr-5" type="submit">Login</button>
                                            </div>
                                        </form>
                                        <p onClick={()=>this.changeActive('Forgot Password')} className='text-center check'><span>Forgot Password</span></p>
                                        <div className="gofb">
                                            <GoogleLogin clientId={this.state.clientId} buttonText="Login with Google" onSuccess={loginGoogle} onFailure={loginGoogle} ></GoogleLogin>
                                            <FacebookLogin appId="885798875528804" autoLoad={false} fields="name,email,picture" callback={loginFB}/>
                                        </div>
                                    </>
                                : this.state.active=='Forgot Password' ?
                                    <form onSubmit={this.forgotPassword} className="mt-5">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>E-Mail Address</label>
                                                <input id="emailRegister" type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Reset Password</button></div>
                                    </form>
                                : this.state.active=='Reset Password' ?
                                    <form onSubmit={this.resetPassword} className="mt-5">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>E-Mail Address</label>
                                                <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={this.state.email} onChange={this.onChange} placeholder="Email Please"/>
                                            </div>
                                            <div className="col-sm-12">
                                                <label>Password</label>
                                                <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={this.state.password} onChange={this.onChange} placeholder="Password Please"/>
                                            </div>
                                            <div className="col-sm-12">
                                                <label>Confirm Password</label>
                                                <input id="password-confirm" type="password" className="form-control" name="confirm_password" required autoComplete="new-password" value={this.state.confirm_password} onChange={this.onChange} placeholder="Confirm Password"/>
                                            </div>
                                        </div>
                                        <div className="my-div"><button type="submit" className="amitBtn">Reset Password</button></div>
                                    </form>
                                : null}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }
}
export default Auth