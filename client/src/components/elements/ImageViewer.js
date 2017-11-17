import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/image-viewer.css';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

class ImageViewer extends Component {
    hideImage() {
        this.props.hideImage();
    }

    castVote() {
        this.props.castVote(this.props.gallery.showImage);
    }

    componentDidMount() {
        this.props.getVotes(this.props.gallery.showImage);
    }

    getVotes() {
        if (this.props.gallery.showImage.votes === undefined) {
            return '-';
        } else if (this.props.gallery.showImage.votes) {
            return this.props.gallery.showImage.votes;
        }
        return '0';
    }

    getDesignerName() {
        if (this.props.gallery.showImage.designer) {
            return this.props.gallery.showImage.designer.displayName
        }
        return 'Loading...';
    }

    showNext() {
        const id = this.props.gallery.showImage.id;
        const gallery = this.props.gallery.imageList;
        const thisIndex = gallery.findIndex(image => image.id === id);

        if (gallery[thisIndex+1]) {
            this.props.showImage(gallery[thisIndex+1]);
            this.props.getVotes(gallery[thisIndex+1]);
        } else {
            this.props.showImage(gallery[0]);
            this.props.getVotes(gallery[gallery.length+1]);
        }
    }

    showPrev() {
        const id = this.props.gallery.showImage.id;
        const gallery = this.props.gallery.imageList;
        const thisIndex = this.props.gallery.imageList.findIndex(image => image.id === id);

        if (gallery[thisIndex-1]) {
            this.props.showImage(gallery[thisIndex-1]);
            this.props.getVotes(gallery[thisIndex-1]);
        } else {
            this.props.showImage(gallery[gallery.length-1]);
            this.props.getVotes(gallery[gallery.length-1]);
        }
    }

    render() {
        return (
            <div className="image-viewer">
                <div className="container">
                    <p className="close-viewer" onClick={() => this.hideImage()}>&#x2715;</p>
                    <p className="next-btn" onClick={() => this.showNext()}>&rsaquo;</p>
                    <p className="prev-btn" onClick={() => this.showPrev()}>&rsaquo;</p>
                    <div className="image-container">
                        <img alt="diagram" src={this.props.gallery.showImage.imageUrl} />
                    </div>
                    <div className="meta">
                        <h1>{this.getDesignerName()}</h1>
                        <div className="actions">
                            <button className="vote-btn" onClick={() => this.castVote()}>VOTE</button>
                            <p className="votes">Votes: {this.getVotes()}</p>
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
