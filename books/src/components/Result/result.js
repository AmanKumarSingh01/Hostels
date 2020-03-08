import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { detailData } from '../../actions/authAction';


class result extends Component {
    constructor(props){
        super(props);
        this.state = {
            result : {},
            sellers :[],
            seller: 'aman'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }

    componentDidMount(){
        let item = this.props.match.params.id;
        axios.post('/api/book/findbyid/'+item)
            .then(res=>{
                this.setState({result : res.data[0]});
                this.setState({sellers : res.data[0].sellers});
            })
            .catch(err =>{
                console.log(err);
            })
    }

    onSubmit(e){
        e.preventDefault();
        let id , name , email , mob;
        this.state.sellers.map( (res) => {
            if(res.name===this.state.seller){
                mob = res.mobile;
                name = res.name;
                id = res._id;
                email=res.email;
            }
        })
        let payload = {
            bookid : id,
            booktitle : this.state.result.title,
            author : this.state.result.author,
            price : this.state.result.price,
            sellername : name,
            selleremail : email,
            sellermobile :mob,
        }
        console.log(payload)
        axios.post('/api/user/cart' , payload)
            .then(RES =>{
                alert('ADDED TO YOUR CART');
                const token = localStorage.jwtToken;
                this.props.detailData(token);
            })

    }

    HandleChange(e){
        e.preventDefault();
        let value =e.target.value;
        console.log(value);
        this.setState({seller:value})
    }



    render() {
        let optionItem =this.state.sellers.map(res =>(
            <option key={res.name} value={res.name} >{res.name}</option>
        ))
        return (
            <div className="container">
                <span style={{marginLeft:'50%'}}><strong>Details</strong></span>
                <div style={{display:'flex'}}>
                    <div>
                        <img src = "https://rukminim1.flixcart.com/image/416/416/jrjizrk0/book/5/3/3/life-of-pi-original-imafd9b4hnhg6x6d.jpeg?q=70" alt ="Image"/>
                    </div>
                    <div style={{marginLeft:'30%' , marginTop: '5%'}}>
                        <ul class="list-group">
                            <li className="list-group-item"><strong>TITLE :-  </strong>{this.state.result.title}</li>
                            <li className="list-group-item list-group-item-primary"><strong>AUTHOR :-  </strong>{this.state.result.author}</li>
                            <li className="list-group-item list-group-item-secondary"><strong>PRICE :-  </strong>{this.state.result.price}</li>
                            <li className="list-group-item list-group-item-success"><strong>SELLERS</strong ></li>
                            {this.state.sellers.map(res =>(
                                  <li className="list-group-item list-group-item-success"><strong>NAME :- </strong > {res.name}</li>

                            ))}
                        </ul>
                    </div>
                </div>
                <label> Choose sellers</label>              
                <select onChange={this.HandleChange}>
                    {optionItem}
                </select>

                <button style={{marginTop:'2%' , marginLeft:'50%' , marginRight:'50%'}} className="btn btn-primary btn-lg" onClick={this.onSubmit}>Add to Cart</button>

            </div>
        )
    }
}


result.propTypes = {
    detailData : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    auth :state.auth,
    user : state.user,
    errors : state.errors
})

export default connect(mapStateToProps , {detailData})(result);
