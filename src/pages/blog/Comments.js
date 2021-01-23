import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
const func = require('../parts/functions')

const block = [
    'sex',
    'girl',
    'porn',
    'nude',
    'horny',
    'bitch',
    'Viagra',
    'Gambling',
    'Cryptocurrencies',
    'Cryptocurrency',
    '$',
    'Bitcoin',
    'USD',
    'www',
    'htttp'
]
export class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:                  [],
            name:                  '',
            email:                 '',
            role:                  '',
            comment:               '',
            error:                 '',
            order:                 0,
            status:                0,
            commentId:             0,
            message:               '',
            errorReason:           ''
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.onEditorChange1 = this.onEditorChange1.bind( this )
    }
        
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.checkForHTML()) }
    onEditorChange1( evt1 ) { this.setState( { comment: evt1.editor.getData() },()=>this.checkForHTML() ) }
    handleChange1( changeEvent1 ) { this.setState( { comment: changeEvent1.target.value } ) }

    componentDidMount(){
        if(typeof(Storage) !== "undefined"){ this.setState({ 
            user: JSON.parse(localStorage.getItem('user')) || [],
        }) }
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            if(JSON.parse(localStorage.getItem('user')).role == 'Admin'){
                this.setState({ 
                    name:                   'AmitKK',
                    email:                  'contact@amitkk.com',
                })
            }else{
                this.setState({ 
                    name: JSON.parse(localStorage.getItem('user')).name || '',
                    email: JSON.parse(localStorage.getItem('user')).email || '',
                    role: JSON.parse(localStorage.getItem('user')).role || '',
                })
            }
        }
    }

    checkForHTML=()=>{
        block.map((i)=>{
            if(this.state.name.includes(i) || this.state.comment.includes(i)){
                this.setState({ 
                    error:          "Error in inputs being provided",
                    errorReason:    i
                })
            }
        })
    }

    addUserModalOn = (i)=>{ 
        this.setState({ 
            commentId:              i.id,
            order:                  1
        })
        if(this.state.role == 'Admin'){
            this.setState({ status: 1 })
        }else{
            this.setState({ status: 0 })
        }
    }
    
    resetData = ()=>{
        this.setState({
            comment:            '',
            commentId:          0,
            order:              0,
            status:             0,
            error:              '',
            errorReason:        ''
        })
    }

    submitComment = (e) => {
        e.preventDefault()
        if(this.state.comment){
            const data={
                id:                 this.props.blogId,
                order:              this.state.order,
                status:             this.state.status,
                commentId:          this.state.commentId,
                name:               this.state.name,
                email:              this.state.email,
                comment:            this.state.comment
            }   
            axios.post('/admin/addComment', data)
                .catch(err=>console.log('err', err))
                .then(res=>{ 
                    func.callSwal(res.data.message)
                })
            this.resetData()
        }else{
            func.callSwal("No comments not allowed")
        }
    }

    render() {
        return (
            <>
                <div className="comments">
                    <h3 className="heading"><span>Share your </span>Views</h3>
                    <p>Please keep your views respectful and not include any anchors, promotional content or obscene words in them. Such comments will be definitely removed and your IP be blocked for future purpose.</p>
                    <form encType="multipart/form-data" onSubmit={this.submitComment}>
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-5">
                                    <label>Name</label>
                                    <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                                </div>    
                                <div className="col-sm-7">
                                    <label>Email</label>
                                    <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                                </div>    
                                <div className="col-sm-12">
                                    <label>Comment</label>
                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.comment} content= {this.state.comment} onChange={this.onEditorChange1} />
                                    { this.state.error ?
                                        <>
                                            <p>{this.state.error}</p>
                                            <p>Do not include - {this.state.errorReason}</p>
                                            <button className="amitBtn" onClick={this.resetData} style={{margin: 'auto'}}>Try Again<span></span></button> 
                                        </>
                                    :   <button className="amitBtn" style={{margin: '1em auto'}}>Submit<span></span></button> 
                                    }
                                    { this.state.message ?  <p>{this.state.message}</p> : null }
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.props.comments ?
                        <>
                            {this.props.comments.length > 0 ?
                                <>
                                    <h3 className="heading"><span>Some love showed </span>by people </h3>
                                    <div className="row comments">
                                        { this.props.comments.map((i, index)=>{ return(
                                            <div className="col-sm-12 mb-5" key={index}>
                                                <div className="card"> 
                                                    <div className="originalComment" dangerouslySetInnerHTML={{ __html: i.comment }}></div>
                                                    <span><strong>{i.user}</strong>
                                                    </span>
                                                    { this.props.response.map((j, index)=>{ 
                                                        if(i.id === j.commentId){
                                                            return(
                                                                <div className="adminReply" key={index}>
                                                                    <div className="not-found-controller" dangerouslySetInnerHTML={{ __html: j.comment }}></div>
                                                                    <span><strong>{j.user}</strong>
                                                                    </span>
                                                                </div>
                                                    )} })}
                                                    { i.id === this.state.commentId ?
                                                        <form encType="multipart/form-data" onSubmit={this.submitComment}>
                                                            <div className="row">
                                                                { !this.state.user.role ?
                                                                    <>
                                                                        <div className="col-sm-6">
                                                                            <label>Name</label>
                                                                            <input className="form-control" type="text" placeholder="Your Name" name="name" required value={this.state.name} onChange={this.onChange}/>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <label>Email</label>
                                                                            <input className="form-control" type="email" placeholder="Your Email ID" name="email" required value={this.state.email} onChange={this.onChange}/>
                                                                        </div>
                                                                    </>
                                                                    : null
                                                                }
                                                                <div className="col-sm-12 comments">
                                                                    <label>Comment</label>
                                                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.comment} onChange={this.onEditorChange1} />
                                                                </div>
                                                            </div>
                                                            <div className="my-btn my-3 flex-he">
                                                                <button className="amitBtn" type="submit" style={{maxWidth: '300px'}}>Submit</button>
                                                                <button className="btn btn-danger" onClick={this.resetData}>Cancel</button>
                                                            </div>
                                                        </form>
                                                    : <div className="forAdmin"><button className="amitBtn" onClick={()=>this.addUserModalOn(i)} style={{margin: 'auto'}}>Reply<span></span></button></div>
                                                    }
                                                </div>
                                            </div>
                                        ) })}
                                    </div>
                                </>
                            : null }
                        </>
                    :null }
                </div>
            </>
        )
    }
}
export default Comments