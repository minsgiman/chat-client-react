import React, {useState} from 'react'
import ModalDlg from './modalDlg'

function RoomCreateDlg({onNameAlert, onCreateRoom, onDlgClose}) {
    const [roomName, setRoomName] = useState('');

    const dlgStyle = {
        width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
    };
    const createRoom = () => {
        if (!roomName) {
            onNameAlert();
            return;
        }
        onCreateRoom(roomName);
    };

    return (
        <div className="room_create_dialog">
            <ModalDlg dlgStyle={dlgStyle}
                      onDlgClose={onDlgClose}
                      content={
                          <div className="content_wrap">
                              <h2>방 이름을 입력해주세요.</h2>
                              <div className="input_wrap">
                                  <input type="text" onChange={(e) => setRoomName(e.target.value)}></input>
                              </div>
                              <div className="btn_wrap">
                                  <button onClick={createRoom}>생성</button>
                              </div>
                          </div>
                      }/>
        </div>
    )
}

export default RoomCreateDlg