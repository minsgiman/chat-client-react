import React from 'react'
import ModalDlg from './modalDlg'

function SelectDlg({onDlgClose, title, message, onSelect, firstvalue, secondvalue}) {
    const dlgStyle = {
        width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
    };

    return (
        <div className="select_dialog">
            <ModalDlg dlgStyle={dlgStyle}
                      onDlgClose={onDlgClose}
                      content={
                          <div className="content_wrap">
                              <h2>{title}</h2>
                              <p className="md_con">{message}</p>
                              <div className="btn_wrap">
                                  <button className="first_btn" onClick={() => onSelect(firstvalue)}>예</button>
                                  <button className="second_btn" onClick={() =>onSelect(secondvalue)}>아니오</button>
                              </div>
                          </div>
                      }/>
        </div>
    )
}

export default SelectDlg;