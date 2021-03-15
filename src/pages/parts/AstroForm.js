import React, { Component } from 'react'
import axios from 'axios'
import window from 'global'
const func = require('./functions')

export class AstroForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               "",
            email:              "",
            phone:              "",
            gender:             "",
            dob:                "",
            tob:                "",
            place:              "",
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    phoneValidate =(e)=>{ if(e.target.value.length<11){ this.setState({ phone:  e.target.value }) } }
    // changeName=(e)=>{ this.setState({ name: e.target.value.replace(/[^A-Za-z]/gi, "") }) }

    submitAddHandler = async(e) =>{
        e.preventDefault()
            const data={
                name:               this.state.name, 
                email:              this.state.email,
                phone:              this.state.phone,
                gender:             this.state.gender,
                dob:                this.state.dob,
                tob:                this.state.tob,
                place:              this.state.place,
            }               
            axios.post('/astroForm', data)
            .then( res=> {
                if(res.data.success){
                    localStorage.setItem('message', 'Form submitted succesfully')
                    window.location.href = '/thank-you'
                }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        return (
            <>
                <form encType="multipart/form-data" onSubmit={this.submitAddHandler} className="contactForm">
                    <label>Name *</label>
                    <input className="form-control" type="text" name="name" required placeholder="Name Please *" value={this.state.name} onChange={this.onChange}/>
                    <label>Email *</label>
                    <input className="form-control" type="email" name="email" required placeholder="Email Please *" value={this.state.email} onChange={this.onChange}/> 
                    <label>Mobile Number *</label>
                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0"  name="phone" required placeholder="Mobile Number Please *" value={this.state.phone} onChange={this.phoneValidate}/>
                    <label>Gender</label>
                    <select className="form-control" name="gender" required value={this.state.gender} onChange={this.onChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label>Date of Birth *</label>
                    <input className="form-control" type="date" name="dob" required placeholder="Date of Birth *" value={this.state.dob} onChange={this.onChange}/>
                    <label>Time of Birth *</label>
                    <input className="form-control" type="time" name="tob" required placeholder="Time of Birth *" value={this.state.tob} onChange={this.onChange}/>
                    <label>Place of Birth *</label>
                    <input className="form-control" type="text" name="place" required placeholder="Place of Birth*" value={this.state.place} onChange={this.onChange}/>
                    <div className="my-div"><button className="amitBtn">Submit</button></div>
                </form>
            </>
        )
    }
}
export default AstroForm