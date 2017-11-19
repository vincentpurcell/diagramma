import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/uploader.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.changeImageTitle = this.changeImageTitle.bind(this);
    }

    componentWillUnmount() {
        this.props.clearUploadQueue();
    }

    changeImageTitle(e) {
        this.props.setTitle({ title: e.target.value, image: e.target.id });
    }

    handleSubmit(e) {
        e.preventDefault();
        const upload = this.props.uploadImage;
        Array.from(this.refs.files.files).forEach((file) => {
            const imageTitle = this.props.upload.imagesQueue.find(i => i.filename === file.name).title;
            upload(file, imageTitle);
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        this.refs.inputArea.classList.add('active');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.refs.inputArea.classList.remove('active');
    }

    handleFiles(e) {
        e.preventDefault();
        this.props.startProcessingFilesForUpload();
        this.refs.inputArea.classList.remove('active');
        Array.from(e.target.files).forEach((file, index) => {
            this.props.saveImageBufferToState({
                filename: file.name,
                filetype: file.type,
                designer: null,
                imageUrl: null,
                thumbnailUrl: null,
                success: null,
                attempts: 0,
                active: false,
                title: file.name,
                working: null,
                tags: []
            });
        });
    }

    notReadyToUpload() {
        const queue = this.props.upload.imagesQueue;

        if (queue.length && queue.findIndex(i => !i.filename) > -1) {
            return true;
        }

        return false;
    }

    fileUploadProgress() {
        if (this.props.upload.imagesQueue.length) {
            return (
                <div>
                    <h2>Queue: </h2>
                    <ul>
                        {this.props.upload.imagesQueue.map((item) => {
                            return (
                                <li key={item.filename}>
                                    <p>Filename: {item.filename}</p>
                                    <p>Designer: {item.designer}</p>
                                    <p>Attempts: {item.attempts}</p>
                                    <label htmlFor={`${item.filename}`}>Title</label>
                                    <input type="text" id={`${item.filename}`} defaultValue={`${item.filename}`} onChange={this.changeImageTitle} />
                                    <p>Working: {item.working === null ? 'Not yet' : (item.working ? 'Uploading...' : 'Done')}</p>
                                    <p>Success: {item.success === null ? 'Not yet' : (item.success ? 'Success' : 'Fail')}</p>
                                    <p>S3 URL: {item.imageUrl || 'Not uploaded'}</p>
                                    <p>S3 Key: {item.s3Key || 'Not uploaded'}</p>
                                    <p>S3 Thumnail URL: {item.thumbnailUrl || 'Not uploaded'}</p>
                                    <p>Thumbnail:</p>
                                    <img height="50" alt="Thumnail preview" width="50" src={item.thumbnailUrl}/>
                                    <p>Full Image:</p>
                                    <img height="100" alt="Full size preview" width="100" src={item.imageUrl}/>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }

        return;
    }

    renderDesignerSelector() {
        return;
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <label>Upload an image</label>
                    <form encType="multipart/form-data">
                        <div className='inputContainer' ref='inputArea'>
                            <label className='fileInputLabel' htmlFor='uploadFilesInput' onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave}>
                                <p>Click or drop files</p>
                                <input className='fileInput' id='uploadFilesInput' multiple type="file" ref="files" onChange={this.handleFiles} />
                            </label>
                        </div>
                        {this.renderDesignerSelector()}

                        <input disabled={this.notReadyToUpload()} className='btn btn-primary' type="submit" onClick={this.handleSubmit} value="Upload" />
                        {this.fileUploadProgress()}
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, upload }) {
    return { auth, upload };
}

export default connect(mapStateToProps, actions)(Upload);
