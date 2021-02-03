import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import AdminBar from '../parts/AdminBar'
import moment from "moment"

export class userAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:               [],
            loading:            true
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            var id = JSON.parse(localStorage.getItem('user')).id
        }
        const response = await fetch( `/admin/userOrders/${id}` )
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            data:                   body.data,
            loading:                false,
        })
    }
    
    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid admin">
                    <div className="row admin">
                        <AdminBar/>
                        <div className="col-sm-10">
                            <h1 className="heading"><span>My</span> Orders</h1>
                            { this.state.data.map((i, index)=>{ return (
                                <div className="userOrders" key={index}>
                                    <div className="orderList">
                                        <p className="text-center">Ordered On: {moment(i.updated_at).format("DD MMMM  YYYY")}</p>
                                        {JSON.parse(i.cart).map((j, index2)=>(
                                            <div key={index2}>
                                                <div className="prod">
                                                    <a href={"/product/"+j[5]}><img src={"/images/product/"+j[2]} className="previewImg"/></a>
                                                    <div>
                                                        <p className="orderNum">{i.orderId}</p>
                                                        <h3>{j[3]}</h3>
                                                        <p>{j[0]} Units @ &#8377;{j[4]} = &#8377;{j[0] * j[4]}</p>
                                                    </div>
                                                </div>
                                                <p>Status: {i.status}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="remarks">
                                        <p>{i.remarks? i.remarks : null}</p>
                                    </div>
                                </div>
                            )})}
                            
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default userAdmin
