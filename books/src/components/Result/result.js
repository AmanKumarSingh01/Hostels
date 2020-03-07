import React, { Component } from 'react'
import axios from 'axios';

class result extends Component {
    constructor(props){
        super(props);
        this.state = {
            result : {}
        }
    }

    componentDidMount(){
        let item = this.props.match.params.id;
        axios.post('/api/book/findbyid/'+item)
            .then(res=>{
                console.log(res.data[0]);
                this.setState({result : res.data[0]});
            })
            .catch(err =>{
                console.log(err);
            })
    }
    render() {
        return (
            <div className="container">
                Hello there!!
            </div>
        )
    }
}


export default result;