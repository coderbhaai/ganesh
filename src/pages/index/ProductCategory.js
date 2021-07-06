import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'

export class ProductCategory extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            category:              this.props.category
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( '/fetchProductCategory' ); 
        const body = await response.json()
        this.setState({
            category :              body.data
        })
    }
    
    render() {
        return (
            <>
                <Header/>
                {this.state.category?           
                    <div className="container page py-5">
                        <h1 className="heading my-3"> Product Categories</h1>
                        <p className="text-center">Below are some fo the product categories you might like to check.</p>
                        <ul className="productCategory my-5">
                            {this.state.category.map((i,index)=>(
                                <li key={index}><a href={"/product-category/"+i.tab1}>{i.name}</a></li>
                            ))}
                        </ul>
                    </div>
                : null}
                <Footer/>
            </>
        )
    }
}

export default ProductCategory
