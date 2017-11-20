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

        this.state = {
            working: false
        };
    }

    componentWillUnmount() {
        this.props.clearUploadQueue();
    }

    changeImageTitle(e) {
        this.props.setTitle({ title: e.target.value, image: e.target.id });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ working: true });
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

    renderThumbnail(item) {
        if (item.thumbnailUrl) {
            return (<img className="responsive-img" alt="Thumbnail" src={item.thumbnailUrl}/>);
        }

        return (<i className="material-icons">insert_photo</i>);
    }

    renderList() {
        return this.props.upload.imagesQueue.map((item) => {
            return (
                <tr key={item.filename} className={item.working ? 'working' : ''}>
                    <td>{this.renderThumbnail(item)}</td>
                    <td><p>{item.filename}</p></td>
                    <td>
                        <label htmlFor={`${item.filename}`}>Title</label>
                        <input type="text" id={`${item.filename}`} defaultValue={`${item.filename}`} onChange={this.changeImageTitle} />
                    </td>
                    <td><p>{item.designer}</p></td>
                    <td><p>{item.attempts}</p></td>
                    <td><p>{item.success === null ? 'Not yet uploaded' : (item.success ? 'Success' : 'Failed')}</p></td>
                </tr>
            );
        });
    }

    fileUploadProgress() {
        if (this.state.working) {
            const numberSuccess = this.props.upload.imagesQueue.filter(i => i.success).length;
            const numberTotal = this.props.upload.imagesQueue.length;
            const percentSuccess = 100 * numberSuccess / numberTotal;

            if (percentSuccess === 100) {
                setTimeout(() => {
                    this.setState({ working: false });
                }, 1500);
            }

            return (
                <div className="progress">
                    <div className="determinate" style={{ height: '1rem', width: `${percentSuccess}%` }}></div>
                </div>
            );
        }

        return;
    }

    fileQueueTable() {
        if (this.props.upload.imagesQueue.length) {
            return (
                <div>
                    <h6>Uploaded Diagrams</h6>
                    <table>
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Filename</th>
                                <th>Title</th>
                                <th>Designer</th>
                                <th>Upload Attempts</th>
                                <th>Success</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            );
        }

        return;
    }

    renderDesignerSelector() {
        return;
    }

    renderUploadButton() {
        if (this.props.upload.imagesQueue.length) {
            return (
                <input disabled={this.notReadyToUpload()} className='btn btn-primary' type="submit" onClick={this.handleSubmit} value="Upload" />
            );
        }

        return;
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <h5>Upload Diagrams</h5>
                    <form encType="multipart/form-data">
                        <div className='inputContainer' ref='inputArea'>
                            <label className='fileInputLabel' htmlFor='uploadFilesInput' onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave}>
                                <h5 className="regular">Click or drop files here to add to upload queue</h5>
                                <h5 className="onHover">Add files</h5>
                                <input className='fileInput' id='uploadFilesInput' multiple type="file" ref="files" onChange={this.handleFiles} />
                            </label>
                        </div>
                        {this.renderDesignerSelector()}
                        {this.fileUploadProgress()}
                        {this.renderUploadButton()}
                        {this.fileQueueTable()}
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
