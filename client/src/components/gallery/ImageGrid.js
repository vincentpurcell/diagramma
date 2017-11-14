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
    extractDesignerName(str) {
        const name = str.split('/')[1].replace('-', ' ');
        return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    showImage(file) {
        this.props.showImage(file, this.extractDesignerName(file));
    }

    componentDidMount() {
        if (this.props.gallery.designer) {
            this.props.getImagesByDesigner(this.props.gallery.designer);
        } else {
            this.props.getImages();
        }
    }

    getImages() {
        if (!this.props.gallery || !this.props.gallery.imageList || !this.props.gallery.imageList.length) {
            return;
        }
        if (this.props.gallery.designer) {
            return this.props.gallery.imageList.map(img =>
                <img className="thumbnail" alt={`Diagram by ${this.props.gallery.designer}`} key={`/${this.props.gallery.designer}${img}`} onClick={() => this.showImage(`/${this.props.gallery.designer}${img}`)} src={`diagrams/thumbnails/${this.props.gallery.designer}${img}`} />
            );
        }
        return this.props.gallery.imageList.map(img =>
            <img className="thumbnail" alt="" onClick={() => this.showImage(img)} key={`diagrams/thumbnails${img}`} src={`diagrams/thumbnails${img}`} />
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
