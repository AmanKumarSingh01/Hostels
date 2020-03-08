import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Cart extends Component {

    constructor(props){
        super(props)
        this.state ={
            user : {},
            count : 0
        }
    }


    render() {
        const {userdata} = this.props.auth;
        console.log(userdata.cart)
        return (
            <div className= "card-deck container" style={{marginTop:'5%' , marginLeft: '25%' , marginRight:'50%'}}>
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col mb-4" >
                        {userdata.cart.map(res =>(
                        <div key={res.id} className="card" style={{width:'31rem' , marginTop:'3%'}}>
                            <div className="card-body">
                                <h5 className="card-title" key={res.title}>{res.booktitle}</h5>
                                <p className="card-text" key={res.price}>{res.price}.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                <Link to ='#'  className="btn btn-primary">Remove</Link>
                            </div>                            
                        </div>
                        ))}
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-lg">Checkout</button>
            </div>
        )
    }
}


Cart.propTypes = {
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors : state.errors
});
  
export default connect(mapStateToProps, {  })(Cart)