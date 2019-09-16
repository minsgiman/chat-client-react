import React, {Component} from 'react';

class ModalDlg extends Component {
    constructor(props) {
        super(props);
    }

    closeDialog = () => {
        this.props.onDlgClose();
    };

    render() {
        return (
            <div className="modal_dialog">
                <div className="dlg_wrap">
                    <div className="content" style={this.props.dlgStyle}>
                        {this.props.content}
                        <a className="btn_close" onClick={this.closeDialog}></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDlg
