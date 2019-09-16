import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {eventBus, EVENT} from './../../services/events'
import socketClient from './../../services/socket-client'
import ChatMessage from './../../components/chatMessage'
import './chatroom.less'

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputMsg: '',
            inviteUser: ''
        };
        eventBus.subscribe(EVENT.CHAT_MESSAGE_PUSH, {callback: this.onChatMessage, id: 'chatroom'});
        eventBus.subscribe(EVENT.LEAVE_ROOM, {callback: this.onLeaveRoom, id: 'chatroom'});
    }

    componentWillUnmount() {
        eventBus.unsubscribe(EVENT.CHAT_MESSAGE_PUSH, 'chatroom');
        eventBus.unsubscribe(EVENT.LEAVE_ROOM, 'chatroom');
    }

    sendMessage = () => {
        socketClient.sendMessage({
            type: 'text',
            data: this.state.inputMsg
        });
        this.setState({inputMsg: ''});
    };

    invite = () => {
        if (this.props.currentRoom) {
            socketClient.invite(this.state.inviteUser, this.props.currentRoom.roomId);
        }
    };

    leaveRoom() {
        socketClient.leaveRoom();
    }

    sendImage = () => {
        const filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            const fileToLoad = filesSelected[0];
            const regImagePattern = /^.*(jpg|jpeg|gif|png)$/;
            if (!regImagePattern.test(fileToLoad.type)) {
                this.props.onAlert('이미지 전송', '이미지 파일을 선택해주세요.');
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

    onChatMessage = (data) => {
        if (data.contentType && data.content) {
            const {messages} = this.state;
            this.setState({
                messages: messages.concat({
                    type: data.contentType,
                    sender: data.sender,
                    content: data.content
                })
            });
            setTimeout(() => {
                const element = document.getElementsByClassName("chat_wrap")[0];
                element.scrollTop = element.scrollHeight;
            }, 0);
        }
    };

    onLeaveRoom = (data) => {
        if (data.code === 1) {
            this.props.history.push('chatlist');
        } else {
            this.props.onAlert('방 나가기', '방 나가기에 실패하였습니다.');
        }
    };

    onUserInputChange = (event) => {
        this.setState({inviteUser: event.target.value});
    };

    onTextInputChange = (event) => {
        this.setState({inputMsg: event.target.value});
    };

    render() {
        return (
            <div className="chat_room">
                <header>
                    <button className="leave_btn" onClick={this.leaveRoom}></button>
                    <h2>{this.props.currentRoom ? this.props.currentRoom.name : ''}</h2>
                    <div className="invite_wrap">
                        <input onChange={this.onUserInputChange}></input>
                        <span onClick={this.invite}>초대</span>
                    </div>
                </header>
                <section>
                    <div className="chat_wrap">
                        {this.state.messages.map((message, index) => {
                           return <ChatMessage type={message.type} content={message.content} sender={message.sender} key={index}/>
                        })}
                    </div>
                    <div className="input_wrap">
                        <label className="img_add" htmlFor="inputFileToLoad"></label>
                        <input style={{display: 'none'}} id="inputFileToLoad" type="file" onChange={this.sendImage}/>
                        <input className="text_input"
                               type="text"
                               value={this.state.inputMsg}
                               onChange={this.onTextInputChange}
                               onKeyUp={(event) => {
                                   if (event.key === 'Enter') {
                                        this.sendMessage();
                                   }
                               }}
                        />
                    </div>
                </section>
            </div>
        )
    }
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