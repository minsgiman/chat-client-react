import React from 'react'
import ModalDlg from './modalDlg'

function ConfirmDlg({onDlgClose, title, message}) {
    const dlgStyle = {
        width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
    };

    return (
        <div className="confirm_dialog">
            <ModalDlg dlgStyle={dlgStyle}
                      onDlgClose={onDlgClose}
                      content={
                          <div className="content_wrap">
                              <h2>{title}</h2>
                              <p>{message}</p>
                              <div className="btn_wrap">
                                  <button onClick={onDlgClose}>확인</button>
                              </div>
                          </div>
                      }/>
        </div>
    )
}

export default ConfirmDlg