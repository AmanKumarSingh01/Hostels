import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class search extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            author : '' , 
            searchResult :[]
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    async onSubmit(e){
        e.preventDefault();
        const  searchData = {
            title :this.state.title, 
            author : this.state.author
        }
        await axios.post('api/book/find' , searchData )
              .then(res => {
                  this.setState({searchResult : res.data})
              })
    }

    displaySearch(result){
        var i=1;
        return(
            
            <div className= "card-deck container" style={{marginTop:'5%' , marginLeft: '25%' , marginRight:'50%'}}>
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col mb-4" >
                        {result.map(res =>(
                        <div key={res.id} className="card" style={{width:'31rem' , marginTop:'3%'}}>
                            <div className="card-body">
                                <h5 className="card-title" key={res.title}>{res.title}</h5>
                                <p className="card-text" key={res.price}>{res.price}.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                <Link to =''  className="btn btn-primary">Add to cart</Link>
                            </div>                            
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <form className="container" onSubmit={this.onSubmit} style= {{width : '50%'}}>
                    <div>
                        <label>Book Title </label>
                            <input  
                                type="text" 
                                autoComplete="off" 
                                className="form-control form-control-lg" 
                                placeholder="Search by BOOK NAME" 
                                name="title" 
                                onChange={this.onChange}
                            />
                    </div>
                    <div>
                        <label>Author Name</label>
                            <input  
                                type="text" 
                                autoComplete="off" 
                                className="form-control form-control-lg" 
                                placeholder="Search by AUTHOR NAME" 
                                name="author" 
                                onChange={this.onChange}
                            />
                    </div>  
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                {this.displaySearch(this.state.searchResult)}
            </div>
        )
    }
}
