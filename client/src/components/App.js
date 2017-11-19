import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import history from './history'

import Header from './elements/Header';
import Gallery from './gallery/Gallery';
import LoginForm from './login/LoginForm';
import SignupForm from './login/SignupForm';

import Upload from './upload/Upload';
import AdminNav from './admin/AdminNav';
import AdminDashboard from './admin/Dashboard';
import ManageUsers from './admin/ManageUsers';
import AddUser from './admin/AddUser';
import ManageSuperclusters from './admin/ManageSuperclusters';
import ManageImages from './admin/ManageImages';

import DesignerNav from './designer/DesignerNav';
import DesignerDashboard from './designer/Dashboard';
import MyDiagrams from './designer/MyDiagrams';
import DesignerProfile from './designer/MyProfile';

class App extends Component {
    componentDidMount() {
        document.title = "DIAGRAMMA 2017";
        this.props.getCurrentUser();
    }

    renderHeader() {
        if (this.props.auth.authenticated) {
            if (this.props.auth.admin) {
                return (
                    <div>
                        <Header />
                        <AdminNav />
                    </div>
                );
            }

            return (
                <div>
                    <Header />
                    <DesignerNav />
                </div>
            );
        }
        return (
            <Header />
        );
    }

    renderAdmin() {
        if (this.props.auth.authenticated && this.props.auth.admin) {
            return (
                <div>
                    <Route path="/admin" exact component={AdminDashboard} />
                    <Route path="/admin/users" exact component={ManageUsers} />
                    <Route path="/admin/users/add" exact component={AddUser} />
                    <Route path="/admin/superclusters" exact component={ManageSuperclusters} />
                    <Route path="/admin/images" exact component={ManageImages} />
                    <Route path="/admin/upload" exact component={Upload} />
                </div>
            );
        }

        return (
            <Route path="/admin" component={LoginForm} />
        );
    }

    renderDesigner() {
        if (this.props.auth.authenticated && this.props.auth.isDesigner) {
            return (
                <div>
                    <Route path="/designer" exact component={DesignerDashboard} />
                    <Route path="/designer/diagrams" exact component={MyDiagrams} />
                    <Route path="/designer/upload" exact component={Upload} />
                    <Route path="/designer/profile" exact component={DesignerProfile} />
                </div>
            );
        }

        return (
            <Route path="/designer" component={LoginForm} />
        );
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    {this.renderHeader()}

                    <Route path="/" exact component={Gallery} />
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/signup" exact component={SignupForm} />

                    {this.renderAdmin()}
                    {this.renderDesigner()}
                </div>
            </Router>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);
