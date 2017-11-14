import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/image-viewer.css';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

class ImageViewer extends Component {
    extractDesignerName(str) {
        const name = str.split('/')[1].replace('-', ' ');
        return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    extractPlainDesignerName(str) {
        const name = str.replace('-', ' ');
        return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    castVote(file) {
        this.props.castVote(file.split('/')[2], this.extractDesignerName(file));
    }

    hideImage() {
        this.props.hideImage();
    }

    showNext() {
        console.log('this is');
        console.log(this.props.gallery.showImage);
        let file = '';
        let index = null;
        if (this.props.gallery.designer) {
            index = this.props.gallery.imageList.findIndex(f => f === this.props.gallery.showImage.replace(`/${this.props.gallery.designer}`, ''));
        } else {
            index = this.props.gallery.imageList.findIndex(f => f === this.props.gallery.showImage);
        }

        if (this.props.gallery.imageList[index +1]) {
            file = this.props.gallery.imageList[index +1];
        } else {
            file = this.props.gallery.imageList[0];
        }

        if (this.props.gallery.designer) {
            this.props.showImage(`/${this.props.gallery.designer}${file}`, this.extractPlainDesignerName(file));
        } else {
            this.props.showImage(file, this.extractDesignerName(file));
        }
    }

    showPrev() {
        let file = '';
        let index = null;
        if (this.props.gallery.designer) {
            index = this.props.gallery.imageList.findIndex(f => f === this.props.gallery.showImage.replace(`/${this.props.gallery.designer}`, ''));
        } else {
            index = this.props.gallery.imageList.findIndex(f => f === this.props.gallery.showImage);
        }

        if (this.props.gallery.imageList[index - 1]) {
            file = this.props.gallery.imageList[index - 1];
        } else {
            file = this.props.gallery.imageList[this.props.gallery.imageList.length - 1];
        }
        console.log('prev file is');
        console.log(file);
        console.log('all files');
        console.log(this.props.gallery.imageList);
        if (this.props.gallery.designer) {
            this.props.showImage(`/${this.props.gallery.designer}${file}`, this.extractPlainDesignerName(file));
        } else {
            this.props.showImage(file, this.extractDesignerName(file));
        }
    }

    componentDidMount() {
        if (this.props.gallery.designer) {
            this.props.getVotes(this.props.gallery.showImage.split('/')[2], this.props.gallery.designer);
        } else {
            this.props.getVotes(this.props.gallery.showImage.split('/')[2], this.props.gallery.showImage.split('/')[1]);
        }
    }

    getDesignerName() {
        if (this.props.gallery.designer) {
            return(<h1>{this.extractPlainDesignerName(this.props.gallery.designer)}</h1>);
        }
        return(<h1>{this.extractDesignerName(this.props.gallery.showImage)}</h1>);
    }

    render() {
        return (
            <div className="image-viewer">
                <div className="container">
                    <p className="close-viewer" onClick={() => this.hideImage()}>&#x2715;</p>
                    <p className="next-btn" onClick={() => this.showNext()}>&rsaquo;</p>
                    <p className="prev-btn" onClick={() => this.showPrev()}>&rsaquo;</p>
                    <div className="image-container">
                        <img alt={`Diagram by ${this.props.gallery.designer}`} src={`/diagrams${this.props.gallery.showImage}`} />
                    </div>
                    <div className="meta">
                        {this.getDesignerName()}
                        <div className="actions">
                            <button className="vote-btn" onClick={() => this.castVote(this.props.gallery.showImage)}>VOTE</button>
                            <p className="votes">Votes: {this.props.gallery.votes.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(ImageViewer);
