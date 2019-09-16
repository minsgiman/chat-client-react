import React, {Component} from 'react'
import ModalDlg from './modalDlg'

const dlgStyle = {
    width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
};

class RoomCreateDlg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: ''
        };
    }

    updateRoomName = (event) => {
        this.setState({roomName: event.target.value});
    };

    createRoom = () => {
        if (!this.state.roomName) {
            this.props.onNameAlert();
            return;
        }
        this.props.onCreateRoom(this.state.roomName);
    };

    render() {
        return (
            <div className="room_create_dialog">
                <ModalDlg dlgStyle={dlgStyle}
                          onDlgClose={this.props.onDlgClose}
                          content={
                              <div className="content_wrap">
                                  <h2>방 이름을 입력해주세요.</h2>
                                  <div className="input_wrap">
                                      <input type="text" onChange={this.updateRoomName}></input>
                                  </div>
                                  <div className="btn_wrap">
                                      <button onClick={this.createRoom}>생성</button>
                                  </div>
                              </div>
                          }/>
            </div>
        )
    }
}

export default RoomCreateDlg