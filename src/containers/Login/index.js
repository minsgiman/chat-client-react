import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import socketClient from './../../services/socket-client'
import {eventBus, EVENT} from './../../services/events'
import './login.less'

function Login({history, onAlert}) {
    const [userId, setUserId] = useState('');

    const onLoginResult = (res) => {
        if (res.code === 1) {
            history.push('chatlist');
        } else {
            onAlert('로그인 실패', '로그인에 실패하였습니다.');
        }
    };

    const connect = () => {
        if (!userId) {
            onAlert('로그인 실패', 'ID를 입력해주세요');
            return;
        }
        socketClient.login(userId);
    };

    const onInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            connect();
        }
    };

    useEffect(() => {
        eventBus.subscribe(EVENT.LOGIN_RESULT, {callback: onLoginResult, id: 'login'});

        return () => {
            eventBus.unsubscribe(EVENT.LOGIN_RESULT, 'login');
        }
    }, []);

    return (
        <div className="login">
            <h2>Chatting App</h2>
            <input type="text" placeholder="ID" onChange={(event) => setUserId(event.target.value)} onKeyPress={onInputKeyPress}></input>
            <button onClick={connect}>로그인</button>
        </div>
    )
}

export default withRouter(Login)