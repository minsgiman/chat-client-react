import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {eventBus, EVENT} from './../../services/events'
import socketClient from './../../services/socket-client'
import ChatMessage from './../../components/chatMessage'
import './chatroom.less'

function ChatRoom({currentRoom, onAlert, history}) {
    const [messages, setMessages] = useState([]),
          [inputMsg, setInputMsg] = useState(''),
          [inviteUser, setInviteUser] = useState('');

    const sendMessage = () => {
        socketClient.sendMessage({
            type: 'text',
            data: inputMsg
        });
        setInputMsg('');
    };

    const invite = () => {
        if (currentRoom) {
            socketClient.invite(inviteUser, currentRoom.roomId);
        }
    };

    const leaveRoom = () => socketClient.leaveRoom();

    const sendImage = () => {
        const filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            const fileToLoad = filesSelected[0];
            const regImagePattern = /^.*(jpg|jpeg|gif|png)$/;
            if (!regImagePattern.test(fileToLoad.type)) {
                onAlert('이미지 전송', '이미지 파일을 선택해주세요.');
                return;
            }

            const fileReader = new FileReader();
            fileReader.onload = fileLoadedEvent => {
                const srcData = fileLoadedEvent.target.result; // <--- data: base64
                socketClient.sendMessage({
                    type: 'img',
                    data: srcData
                });
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    };

    const onChatMessage = (data) => {
        if (data.contentType && data.content) {
            setMessages(msgs => msgs.concat({
                type: data.contentType,
                sender: data.sender,
                content: data.content
            }));

            setTimeout(() => {
                const element = document.getElementsByClassName("chat_wrap")[0];
                element.scrollTop = element.scrollHeight;
            }, 0);
        }
    };

    const onLeaveRoom = (data) => {
        if (data.code === 1) {
            history.push('chatlist');
        } else {
            onAlert('방 나가기', '방 나가기에 실패하였습니다.');
        }
    };

    useEffect(() => {
        eventBus.subscribe(EVENT.CHAT_MESSAGE_PUSH, {callback: onChatMessage, id: 'chatroom'});
        eventBus.subscribe(EVENT.LEAVE_ROOM, {callback: onLeaveRoom, id: 'chatroom'});

        return () => {
            eventBus.unsubscribe(EVENT.CHAT_MESSAGE_PUSH, 'chatroom');
            eventBus.unsubscribe(EVENT.LEAVE_ROOM, 'chatroom');
        }
    }, []);

    return (
        <div className="chat_room">
            <header>
                <button className="leave_btn" onClick={leaveRoom}></button>
                <h2>{currentRoom ? currentRoom.name : ''}</h2>
                <div className="invite_wrap">
                    <input onChange={(event) => setInviteUser(event.target.value)}></input>
                    <span onClick={invite}>초대</span>
                </div>
            </header>
            <section>
                <div className="chat_wrap">
                    {messages.map((message, index) => {
                        return <ChatMessage type={message.type} content={message.content} sender={message.sender} key={index}/>
                    })}
                </div>
                <div className="input_wrap">
                    <label className="img_add" htmlFor="inputFileToLoad"></label>
                    <input style={{display: 'none'}} id="inputFileToLoad" type="file" onChange={sendImage}/>
                    <input className="text_input"
                           type="text"
                           value={inputMsg}
                           onChange={(event) => setInputMsg(event.target.value)}
                           onKeyUp={(event) => {
                               if (event.key === 'Enter') {
                                   sendMessage();
                               }
                           }}
                    />
                </div>
            </section>
        </div>
    )
}

const msgStateToProps = state => {
    return {
        currentRoom: state.chat.currentRoom
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onTodoClick: id => {
//             dispatch(toggleTodo(id))
//         }
//     }
// }

export default withRouter(connect(msgStateToProps)(ChatRoom))