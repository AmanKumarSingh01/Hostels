import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {registerUser} from './../../actions/authAction'
class Register extends Component {
    constructor(){
        super();
        this.state={
            name : '',
            email : '',
            password : '',
            password2 : '',
            errors : []
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const  user = {
            name :this.state.name,
            email :this.state.email,
            password :this.state.password,
            password2 :this.state.password2
        }

        this.props.registerUser(user , this.props.history);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/search')
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({errors :nextProps.errors});
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg" , {
                                        'is-invalid' :errors.name
                                    })} 
                                    placeholder="Name" 
                                    name="name" 
                                    onChange={this.onChange}
                                />
                                {errors.name&&(<div className = "invalid-feedback"> {errors.name} </div>)}
                                </div>
                                <div className="form-group">
                                <input 
                                    type="email" 
                                    className={classnames("form-control form-control-lg" , {
                                        'is-invalid' :errors.email
                                    })} 
                                    placeholder="Email Address" 
                                    name="email" 
                                    onChange={this.onChange}
                                />
                                {errors.email&&(<div className = "invalid-feedback"> {errors.email} </div>)}
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="password" 
                                    autoComplete="off"
                                    className={classnames("form-control form-control-lg" , {
                                        'is-invalid' :errors.password
                                    })} 
                                    placeholder="Password" 
                                    name="password" 
                                    onChange={this.onChange}
                                />
                                {errors.password&&(<div className = "invalid-feedback"> {errors.password} </div>)}
                                </div>
                                <div className="form-group">
                                <input 
                                    type="password"
                                    autoComplete="off" 
                                    className={classnames("form-control form-control-lg" , {
                                        'is-invalid' :errors.password2
                                    })} 
                                    placeholder="Confirm Password" 
                                    name="password2"
                                    onChange={this.onChange}
                                 />
                                 {errors.password2&&(<div className = "invalid-feedback"> {errors.password2} </div>)}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propsTypes = {
    registerUser : PropsTypes.func.isRequired,
    auth :  PropsTypes.object.isRequired,
    errors  :  PropsTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
})

export default connect(mapStateToProps , {registerUser})(withRouter(Register))