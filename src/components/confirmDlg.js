import React, {Component} from 'react'
import ModalDlg from './modalDlg'

const dlgStyle = {
    width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
};

class ConfirmDlg extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="confirm_dialog">
                <ModalDlg dlgStyle={dlgStyle}
                          onDlgClose={this.props.onDlgClose}
                          content={
                              <div className="content_wrap">
                                  <h2>{this.props.title}</h2>
                                  <p>{this.props.message}</p>
                                  <div className="btn_wrap">
                                      <button onClick={this.props.onDlgClose}>확인</button>
                                  </div>
                              </div>
                          }/>
            </div>
        )
    }
}

export default ConfirmDlg