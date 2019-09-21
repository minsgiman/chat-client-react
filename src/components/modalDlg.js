import React from 'react';

function ModalDlg({dlgStyle, content, onDlgClose}) {
    return (
        <div className="modal_dialog">
            <div className="dlg_wrap">
                <div className="content" style={dlgStyle}>
                    {content}
                    <a className="btn_close" onClick={onDlgClose}></a>
                </div>
            </div>
        </div>
    )
}

export default ModalDlg
