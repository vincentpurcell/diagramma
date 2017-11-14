import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './elements/Header';
import Gallery from './gallery/Gallery';
import LoginForm from './login/LoginForm';
import Upload from './upload/Upload';
import Dashboard from './admin/Dashboard';

class App extends Component {
    componentDidMount() {
        document.title = "DIAGRAMMA 2017";
    }

    renderAdminIfHasPermissions() {
        // Uploading and management are behind auth walls.
        if (this.props.auth.id) {
            return (
                <div>
                    <Route path="/admin" component={Dashboard} />
                    <Route path="/upload" exact component={Upload} />
                </div>
            );
        }

        return (
            <div>
                <Route path="/admin" component={LoginForm} />
                <Route path="/upload" exact component={LoginForm} />
            </div>
        );
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Gallery} />
                        {this.renderAdminIfHasPermissions()}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);
