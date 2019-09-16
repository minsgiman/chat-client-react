import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import socketClient from './../../services/socket-client'
import {eventBus, EVENT} from './../../services/events'
import RoomCreateDlg from './../../components/roomCreateDlg'
import './chatlist.less'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomList: [],
            isShowCreateDlg: false
        };
        eventBus.subscribe(EVENT.GET_ROOM_LIST, {callback: this.onGetRoomList, id: 'chatlist'});
        eventBus.subscribe(EVENT.CREATE_ROOM, {callback: this.onCreateRoom, id: 'chatlist'});
        eventBus.subscribe(EVENT.ENTER_ROOM, {callback: this.onEnterRoom, id: 'chatlist'});
        this.getRoomList();
    }

    componentWillUnmount() {
        eventBus.unsubscribe(EVENT.GET_ROOM_LIST, 'chatlist');
        eventBus.unsubscribe(EVENT.CREATE_ROOM, 'chatlist');
        eventBus.unsubscribe(EVENT.ENTER_ROOM, 'chatlist');
    }

    onGetRoomList = (data) => {
        if (data.code === 1 && data.rooms) {
            this.setState({roomList: data.rooms});
        }
    };

    onCreateRoom = (data) => {
        if (data.code === 1 && data.room) {
            socketClient.enterRoom(data.room);
            //socketClient.getRoomList();
        } else {
            this.props.onAlert('방 생성', '방 생성에 실패하였습니다.');
        }
        this.setState({isShowCreateDlg: false});
    };

    onEnterRoom = (data) => {
        if (data.code === 1) {
            this.props.history.push('chatroom');
        } else {
            this.props.onAlert('입장', '입장에 실패하였습니다.');
        }
    };

    onNameAlert = (data) => {
        this.props.onAlert('방 생성', '방 이름을 입력하세요.');
    };

    logout = () => {
        socketClient.logout();
        this.props.history.push('/');
    };

    createRoom(roomName) {
        socketClient.createRoom(roomName);
    }

    enterRoom(room) {
        socketClient.enterRoom(room);
    }

    getRoomList() {
        socketClient.getRoomList();
    }

    render() {
        return (
            <div className="chat_list_wrap">
                <header>
                    <h2>채팅</h2>
                    <p className="userId">{this.props.userId}</p>
                    <div className="control_wrap">
                        <button className="create" onClick={() => {this.setState({isShowCreateDlg: true})}}>방 생성</button>
                        <button className="logout" onClick={this.logout}>로그아웃</button>
                    </div>
                </header>
                <section>
                    {!!this.state.roomList.length &&
                        <ul className="room_list">
                            {this.state.roomList.map((room, index) => {
                                return (
                                    <li className="room" key={index} onClick={() => this.enterRoom(room)}>
                                        <p>{room.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                    {!this.state.roomList.length &&
                        <p className="noroom_noti">방이 없습니다.</p>
                    }
                </section>
                <button className="refresh" onClick={this.getRoomList}></button>
                {this.state.isShowCreateDlg &&
                    <RoomCreateDlg onNameAlert={this.onNameAlert}
                                   onDlgClose={() => {this.setState({isShowCreateDlg: false})}}
                                   onCreateRoom={this.createRoom}>
                    </RoomCreateDlg>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.chat.userId
    }
};

export default withRouter(connect(mapStateToProps)(ChatList));