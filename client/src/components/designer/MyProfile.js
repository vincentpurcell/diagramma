import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.auth.displayName,
            email: this.props.auth.email,
            password: '',
            confirmPassword: ''
        };

        this.changeDisplayName = this.changeDisplayName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeDisplayName(e) {
        this.setState({ displayName: e.target.value });
    }

    changeEmail(e) {
        this.setState({ email: e.target.value });
    }

    changePassword(e) {
        this.setState({ password: e.target.value });
    }

    changeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    handleSubmit() {
        const saveObj = {};
        if (this.state.displayName) saveObj.displayName = this.state.displayName;
        if (this.state.email) saveObj.email = this.state.email;
        if (this.state.password && this.state.password === this.state.confirmPassword) saveObj.password = this.state.password;
        this.props.updateMyProfile(saveObj);
    }

    renderPasswordError() {
        if (this.state.password && this.state.password !== this.state.confirmPassword) {
            return (
                <div><p>Error: Passwords don't match.</p></div>
            );
        }

        return;
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col s12">
                            <h5>My Profile</h5>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="display-name">My Public Display Name</label>
                            <input id="display-name" type="text" defaultValue={this.props.auth.displayName} onChange={this.changeDisplayName}/>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="email">My Email</label>
                            <input id="email" type="text" defaultValue={this.props.auth.email} onChange={this.changeEmail}/>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" onChange={this.changePassword}/>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="password" onChange={this.changeConfirmPassword}/>
                            {this.renderPasswordError()}
                        </div>
                        <div className="input-field col s12">
                            <input className="waves-effect waves-light btn" onClick={this.handleSubmit} type="submit" value="Update Profile" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(MyProfile);
