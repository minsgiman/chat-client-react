import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import socketClient from './../../services/socket-client'
import {eventBus, EVENT} from './../../services/events'
import RoomCreateDlg from './../../components/roomCreateDlg'
import './chatlist.less'

function ChatList({onAlert, history, userId}) {
    const [roomList, setRoomList] = useState([]),
          [isShowCreateDlg, setIsShowCreateDlg] = useState(false);

    const onGetRoomList = (data) => {
        if (data.code === 1 && data.rooms) {
            setRoomList(data.rooms);
        }
    };

    const onCreateRoom = (data) => {
        if (data.code === 1 && data.room) {
            socketClient.enterRoom(data.room);
            //socketClient.getRoomList();
        } else {
            onAlert('방 생성', '방 생성에 실패하였습니다.');
        }
        setIsShowCreateDlg(false);
    };

    const onEnterRoom = (data) => {
        if (data.code === 1) {
            history.push('chatroom');
        } else {
            onAlert('입장', '입장에 실패하였습니다.');
        }
    };

    const onNameAlert = (data) => onAlert('방 생성', '방 이름을 입력하세요.');

    const logout = () => {
        socketClient.logout();
        history.push('/');
    };

    const createRoom = (roomName) => socketClient.createRoom(roomName);

    const enterRoom = (room) => socketClient.enterRoom(room);

    const getRoomList = () => socketClient.getRoomList();

    useEffect(() => {
        eventBus.subscribe(EVENT.GET_ROOM_LIST, {callback: onGetRoomList, id: 'chatlist'});
        eventBus.subscribe(EVENT.CREATE_ROOM, {callback: onCreateRoom, id: 'chatlist'});
        eventBus.subscribe(EVENT.ENTER_ROOM, {callback: onEnterRoom, id: 'chatlist'});
        getRoomList();

        return () => {
            eventBus.unsubscribe(EVENT.GET_ROOM_LIST, 'chatlist');
            eventBus.unsubscribe(EVENT.CREATE_ROOM, 'chatlist');
            eventBus.unsubscribe(EVENT.ENTER_ROOM, 'chatlist');
        }
    }, []);

    return (
        <div className="chat_list_wrap">
            <header>
                <h2>채팅</h2>
                <p className="userId">{userId}</p>
                <div className="control_wrap">
                    <button className="create" onClick={() => {setIsShowCreateDlg(true)}}>방 생성</button>
                    <button className="logout" onClick={logout}>로그아웃</button>
                </div>
            </header>
            <section>
                {!!roomList.length &&
                <ul className="room_list">
                    {roomList.map((room, index) => {
                        return (
                            <li className="room" key={index} onClick={() => enterRoom(room)}>
                                <p>{room.name}</p>
                            </li>
                        )
                    })}
                </ul>
                }
                {!roomList.length &&
                <p className="noroom_noti">방이 없습니다.</p>
                }
            </section>
            <button className="refresh" onClick={getRoomList}></button>
            {isShowCreateDlg &&
            <RoomCreateDlg onNameAlert={onNameAlert}
                           onDlgClose={() => {setIsShowCreateDlg(false)}}
                           onCreateRoom={createRoom}>
            </RoomCreateDlg>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.chat.userId
    }
};

export default withRouter(connect(mapStateToProps)(ChatList));