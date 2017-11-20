import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class LoginForm extends Component {
    tryLogin(e) {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.props.loginUser({ username, password });
    }

    renderError() {
        if (this.props.auth.error) {
            return (
                <p>Wrong username or password.</p>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.tryLogin.bind(this)}>
                    <div className="row">
                        <div className="col s12">
                            <h4>Login</h4>
                            <p>Login to diagramma to manage your diagrams, edit your profile and submit diagrams to the collection.</p>
                            <br />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" ref="username" />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="password">Username</label>
                            <input id="password" type="password" ref="password" />
                            {this.renderError()}
                        </div>
                        <div className="input-field col s12">
                            <input className="waves-effect waves-light btn black" type="submit" value="Login" />
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

export default connect(mapStateToProps, actions)(LoginForm);
