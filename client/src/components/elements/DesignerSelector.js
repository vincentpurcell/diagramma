import React, { Component, findDOMNode } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from '../../actions';
import '../../styles/selector.css';

class DesignerSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    componentDidMount() {
        this.props.getDesigners();
    }

    componentWillReceiveProps() {
        $('select').material_select();
        $('#designerSelector').on('change',this.handleChange);
    }

    handleChange(e) {
        console.log(e);
        if (e && e.currentTarget.value) {
            this.props.getImagesByDesigner(e.currentTarget);
        } else {
            this.props.getImages();
        }
    }

    showAll() {
        $('#designerSelector').val('').trigger('change');
        this.props.getImages();
    }

    getDesigners() {
        if (!this.props.gallery || !this.props.gallery.designers || !this.props.gallery.designers.length) {
            return;
        }

        return this.props.gallery.designers.map(d => {
            if (d.displayName !== 'Super Admin') {
                return (<option key={d.id} value={d.id}>{d.displayName}</option>);
            }
            return;
        });
    }

    render() {
        return (
            <div className="row site-header">
                <div className="input-field col s12 m6">
                    <button className="btn universe white black-text z-depth-0" onClick={this.showAll}>Universe</button>
                </div>
                <div className="input-field col s12 m6 designers">
                    <select
                        id="designerSelector"
                        onChange={this.handleChange}
                        defaultValue=""
                        placeholder="View by Designer">
                        <option value="" disabled>View by Designer</option>
                        {this.getDesigners()}
                    </select>
                </div>
            </div>
        );
    }
}




//                        value={this.props.gallery.designer}


function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(DesignerSelector);
