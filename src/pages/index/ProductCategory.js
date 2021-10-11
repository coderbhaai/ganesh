import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class ProductCategory extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            category:              this.props.category,
            cart:                       [],
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        if(typeof(Storage) !== "undefined"){ this.setState({ cart: JSON.parse(localStorage.getItem('cart')) || [] }) }
        const response = await fetch( '/fetchProductCategory' ); 
        const body = await response.json()
        this.setState({
            category :              body.data
        })
    }
    
    render() {
        return (
            <>
               <Header cart={this.state.cart.length}/>
                {this.state.category?           
                    <div className="container page py-5">
                        <h1 className="heading my-3"> Product Categories</h1>
                        <p className="text-center">Below are some fo the product categories you might like to check.</p>
                        <ul className="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li className="active">Shop</li>
                        </ul>
                        <div className="row productCategory my-5">
                            {this.state.category.map((i,index)=>(
                                <div className="col-sm-4" key={index}>
                                    <div className="card">
                                        <a href={"/product-category/"+i.tab1}>
                                            <div>
                                                {i.tab2?
                                                    <img src={"/images/category/"+ i.tab2 } alt={i.tab2.replace('.jpg', '').replace('.png', '').replace(/_/g, ' ').replace(/-/g, ' ')}/>
                                                :   <img src="/images/logo.svg" className="logo" alt="Pujarambh Logo" width="100" height="57"/>
                                                }
                                            </div>
                                            <div className="name">
                                                <h2>{i.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div> 
                    </div>
                : null}
                <Footer/>
            </>
        )
    }
}

export default ProductCategory
