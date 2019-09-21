import React, {useState, useEffect} from 'react'
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

function App({history}) {
    const [showAlert, setShowAlert] = useState(false),
          [showInvite, setShowInvite] = useState(false),
          [alertTitle, setAlertTitle] = useState(''),
          [alertDesc, setAlertDesc] = useState(''),
          [selectTitle, setSelectTitle] = useState('초대하였습니다.'),
          [selectMessage, setSelectMessage] = useState('');

    const onInvite = (message) => {
        inviteRoomId = message.roomId;
        setSelectMessage(message.from + '으로부터' + '\'' + message.name + '\'' + '에 초대가 왔습니다.');
        setShowInvite(true);
    };

    const onAlert = (title, desc) => {
        setAlertTitle(title);
        setAlertDesc(desc);
        setShowAlert(true);
    };

    const onInviteResult = (message) => {
        let alertMsg;
        if (message.code === 1) {
            alertMsg = message.to + '님에게 초대를 보냈습니다.';
        } else {
            alertMsg = message.to + '님에게 초대를 보내는데 실패하였습니다.';
        }
        onAlert('채팅방 초대', alertMsg);
    };

    const onInviteAccept = (message) => {
        history.push('chatroom');
    };

    const onInviteSelect = (value) => {
        if (value === 'ok') {
            socketClient.inviteAccept(inviteRoomId);
        }
        setSelectMessage('');
        setShowInvite(false);
    };

    useEffect(() => {
        eventBus.subscribe(EVENT.INVITE_PUSH, {callback: onInvite, id: 'root'});
        eventBus.subscribe(EVENT.INVITE_RES, {callback: onInviteResult, id: 'root'});
        eventBus.subscribe(EVENT.INVITE_ACCEPT, {callback: onInviteAccept, id: 'root'});

        return () => {
            eventBus.unsubscribe(EVENT.INVITE_PUSH, 'root');
            eventBus.unsubscribe(EVENT.INVITE_RES, 'root');
            eventBus.unsubscribe(EVENT.INVITE_ACCEPT, 'root');
        }
    }, []);

    return (
        <div className="app">
            <div className="container">
                <Switch>
                    <Route exact path="/" render={() => <Login onAlert={onAlert}/>}/>
                    <Route exact path="/chatlist" render={() => <ChatList onAlert={onAlert}/>}/>
                    <Route exact path="/chatroom" render={() => <ChatRoom onAlert={onAlert}/>}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
            {showAlert &&
            <ConfirmDlg onDlgClose={() => setShowAlert(false)}
                        title={alertTitle}
                        message={alertDesc}
            />
            }
            {showInvite &&
            <SelectDlg onDlgClose={() => setShowInvite(false)}
                       onSelect={onInviteSelect}
                       title={selectTitle}
                       message={selectMessage}
                       firstvalue={"ok"}
                       secondvalue={"nok"}
            />
            }
        </div>
    )
}

export default withRouter(App)
