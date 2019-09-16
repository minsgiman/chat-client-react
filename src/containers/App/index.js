import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Login from './../Login'
import ChatList from './../ChatList'
import ChatRoom from './../ChatRoom'
import NotFound from './../NotFound'
import ConfirmDlg from './../../components/confirmDlg'
import SelectDlg from './../../components/selectDlg'
import socketClient from './../../services/socket-client'
import {EVENT, eventBus} from "../../services/events";

let inviteRoomId = null;

class App extends Component {
    constructor() {
        super();
        this.state = {
            showAlert: false,
            showInvite: false,
            alertTitle: '',
            alertDesc: '',
            selectTitle: '초대하였습니다.',
            selectMessage: ''
        };
        eventBus.subscribe(EVENT.INVITE_PUSH, {callback: this.onInvite, id: 'root'});
        eventBus.subscribe(EVENT.INVITE_RES, {callback: this.onInviteResult, id: 'root'});
        eventBus.subscribe(EVENT.INVITE_ACCEPT, {callback: this.onInviteAccept, id: 'root'});
    }

    componentWillUnmount() {
        eventBus.unsubscribe(EVENT.INVITE_PUSH, 'root');
        eventBus.unsubscribe(EVENT.INVITE_RES, 'root');
        eventBus.unsubscribe(EVENT.INVITE_ACCEPT, 'root');
    }

    onInvite = (message) => {
        inviteRoomId = message.roomId;
        this.setState({
            selectMessage: message.from + '으로부터' + '\'' + message.name + '\'' + '에 초대가 왔습니다.',
            showInvite: true
        });
    };

    onInviteResult = (message) => {
        let alertMsg;
        if (message.code === 1) {
            alertMsg = message.to + '님에게 초대를 보냈습니다.';
        } else {
            alertMsg = message.to + '님에게 초대를 보내는데 실패하였습니다.';
        }
        this.onAlert('채팅방 초대', alertMsg);
    };

    onInviteAccept = (message) => {
        this.props.history.push('chatroom');
    };

    onAlert = (title, desc) => {
        this.setState({
            alertTitle: title,
            alertDesc: desc,
            showAlert: true
        });
    };

    onInviteSelect = (value) => {
        if (value === 'ok') {
            socketClient.inviteAccept(inviteRoomId);
        }
        this.setState({selectMessage: '', showInvite: false});
    };

    render () {
        return (
            <div className="app">
                <div className="container">
                    <Switch>
                        <Route exact path="/" render={() => <Login onAlert={this.onAlert}/>}/>
                        <Route exact path="/chatlist" render={() => <ChatList onAlert={this.onAlert}/>}/>
                        <Route exact path="/chatroom" render={() => <ChatRoom onAlert={this.onAlert}/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                {this.state.showAlert &&
                    <ConfirmDlg onDlgClose={() => this.setState({showAlert: false})}
                                title={this.state.alertTitle}
                                message={this.state.alertDesc}
                    />
                }
                {this.state.showInvite &&
                    <SelectDlg onDlgClose={() => this.setState({showInvite: false})}
                               onSelect={this.onInviteSelect}
                               title={this.state.selectTitle}
                               message={this.state.selectMessage}
                               firstvalue={"ok"}
                               secondvalue={"nok"}
                    />
                }
            </div>
        )
    }
}

export default withRouter(App)
