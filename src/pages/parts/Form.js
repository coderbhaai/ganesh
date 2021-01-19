import React, { Component } from 'react'
import axios from 'axios'
import window from 'global'
const func = require('../parts/functions')

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',               
            email:              '',
            phone:              '',
            message:            '',
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    phoneValidate =(e)=>{ if(e.target.value.length<11){ this.setState({ phone:  e.target.value }) } }
    changeName=(e)=>{ this.setState({ name: e.target.value.replace(/[^A-Za-z]/gi, "") }) }

    submitAddHandler = async(e) =>{
        e.preventDefault()
            const data={
                name:               this.state.name, 
                email:              this.state.email,
                phone:              this.state.phone,
                message:            this.state.message,
            }               
            axios.post('/contactForm', data)
            .then( res=> {
                if(res.data.success){
                    localStorage.setItem('message', 'Form submitted succesfully')
                    window.location.href = '/thank-you'
                }
            })
            .catch(err=>console.log('err', err))
    }

    render() {
        return (
            <>
                <form encType="multipart/form-data" onSubmit={this.submitAddHandler} className="contactForm">
                    <label>Name *</label>
                    <input className="form-control" type="text" name="name" required placeholder="Name Please *" value={this.state.name} onChange={this.changeName}/>
                    <label>Email *</label>
                    <input className="form-control" type="email" name="email" required placeholder="Email Please *" value={this.state.email} onChange={this.onChange}/> 
                    <label>Mobile Number *</label>
                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0"  name="phone" required placeholder="Mobile Number Please *" value={this.state.phone} onChange={this.phoneValidate}/>
                    <label>Message *</label>
                    <textarea name="message" className="form-control" required placeholder="Please tell us a little about your requirement" value={this.state.message} onChange={this.onChange}></textarea>
                    <div className="my-div"><button className="amitBtn">Submit</button></div>                    
                </form>
            </>
        )
    }
}
export default Form