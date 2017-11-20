import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/images.css';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;
require('featherlight/release/featherlight.min.js');
require('featherlight/release/featherlight.min.css');
require('featherlight/release/featherlight.gallery.min.js');
require('featherlight/release/featherlight.gallery.min.css');

class ImageGrid extends Component {
    componentDidMount() {
        if (this.props.gallery.designer) {
            this.props.getImagesByDesigner(this.props.gallery.designer);
        } else {
            this.props.getImages();
        }
    }

    showImage(img) {
        this.props.showImage(img);
    }

    getImages() {
        if (!this.props.gallery || !this.props.gallery.imageList || !this.props.gallery.imageList.length) {
            return;
        }

        return this.props.gallery.imageList.map(img =>
            <div className="thumbnail-container valign-wrapper center-align" key={img.id}>
                <img className="thumbnail"
                     alt={`Diagram by {img.designer.displayName}`}
                     title={`${img.filename} by ${img.designer.displayName}`}
                     onClick={() => this.showImage(img)}
                     src={img.thumbnailUrl}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="images-gallery-container">
                {this.getImages()}
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(ImageGrid);
