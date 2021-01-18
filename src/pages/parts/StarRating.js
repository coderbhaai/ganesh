import React, { Component } from 'react'

export class StarRating extends Component {
    render() {
        return (
            <div className="star-rating m-0">
                {this.props.rating?
                    <>
                        <span className="rating">
                            <input type="radio" className="rating-input" id="rating-input-1-1" readOnly checked={Math.ceil( this.props.rating)== 5 ? true : false}/><label htmlFor="rating-input-1-1" className="rating-star"></label>
                            <input type="radio" className="rating-input" id="rating-input-1-2" readOnly checked={Math.ceil( this.props.rating)== 4 ? true : false}/><label htmlFor="rating-input-1-2" className="rating-star"></label>
                            <input type="radio" className="rating-input" id="rating-input-1-3" readOnly checked={Math.ceil( this.props.rating)== 3 ? true : false}/><label htmlFor="rating-input-1-3" className="rating-star"></label>
                            <input type="radio" className="rating-input" id="rating-input-1-4" readOnly checked={Math.ceil( this.props.rating)== 2 ? true : false}/><label htmlFor="rating-input-1-4" className="rating-star"></label>
                            <input type="radio" className="rating-input" id="rating-input-1-5" readOnly checked={Math.ceil( this.props.rating)== 1 ? true : false}/><label htmlFor="rating-input-1-5" className="rating-star"></label>
                        </span>
                    </>
                : null}
            </div>
        )
    }
}

export default StarRating
