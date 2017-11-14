import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const Loading = () => (
    <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                <div className="circle"></div>
                </div><div className="gap-patch">
                <div className="circle"></div>
                </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
        </div>
    </div>
);

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Loading);
