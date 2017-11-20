import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignupForm extends Component {
    tryLogin(e) {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const displayName = this.refs.displayName.value;
        const email = this.refs.email.value;

        this.props.registerUser({ username, password, displayName, email, isDesigner: true });
    }

    renderError() {
        if (this.props.auth.error) {
            return (
                <p>Error Registering User.</p>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.tryLogin.bind(this)}>
                    <div className="row">
                        <div className="col s12">
                            <h4>Sign Up for Diagramma</h4>
                            <p>Sign up to join the diagramma community. While your account will be immediately available to upload diagrams of your own, you will need to be approved by an administrator before your diagrams go public.</p>
                            <br />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" ref="username" />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="username">Public Display Name</label>
                            <input id="username" type="text" ref="displayName" />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="username">Email</label>
                            <input id="username" type="text" ref="email" />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" ref="password" />
                            {this.renderError()}
                        </div>
                        <div className="input-field col s12">
                            <input className="waves-effect waves-light btn black corners" onClick={this.tryLogin.bind(this)} type="submit" value="Sign Up" />
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

export default connect(mapStateToProps, actions)(SignupForm);
