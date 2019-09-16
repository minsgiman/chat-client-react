import React, {Component} from 'react'
import ModalDlg from './modalDlg'

const dlgStyle = {
    width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
};

class SelectDlg extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="select_dialog">
                <ModalDlg dlgStyle={dlgStyle}
                          onDlgClose={this.props.onDlgClose}
                          content={
                             <div className="content_wrap">
                                 <h2>{this.props.title}</h2>
                                 <p className="md_con">{this.props.message}</p>
                                 <div className="btn_wrap">
                                     <button className="first_btn" onClick={() => this.props.onSelect(this.props.firstvalue)}>예</button>
                                     <button className="second_btn" onClick={() => this.props.onSelect(this.props.secondvalue)}>아니오</button>
                                 </div>
                             </div>
                          }/>
            </div>
        )
    }
}

export default SelectDlg;