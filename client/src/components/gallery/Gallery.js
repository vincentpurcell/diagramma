import React, { Component } from 'react';
import { connect } from 'react-redux';

import DesignerSelector from '../elements/DesignerSelector';
import ImageGrid from './ImageGrid';
import ImageViewer from '../elements/ImageViewer';

import * as actions from '../../actions';

class Gallery extends Component {
    renderViewer() {
        if (this.props.gallery.showImage) {
            return (<ImageViewer />);
        }
        return;
    }
    render() {
        return (
            <div>
                {this.renderViewer()}
                <DesignerSelector />
                <ImageGrid />
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(Gallery);
